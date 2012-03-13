#FUNCTIONS

#================================================================================================
# Inputs 
#	$cs:	A valid connection string
#	$Name 	The name of the environment (must match a vc server name that you can ping)
#
# Returns
# 	[int] The Id of the environment.
#
# Details
#
#	If the environment already exists in the database, the id of the existing one is returned.
#================================================================================================
function AddEnvironment ($cs , $Name) {

	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()
	$cmd = New-Object system.Data.SqlClient.sqlcommand
	$cmd.connection = $conn

	#Add environment if it isnt there already
	$cmd.commandtext = "select * from environments where name = '$Name'"

	$reader = $cmd.executereader()
	if ($reader.hasrows) {$AlreadyExists = $True}
	$reader.close()

	
	if (!($AlreadyExists -eq  $True)) {
		$24HoursAgo = (Get-Date).Addhours(-24)
		$cmd.commandtext = "INSERT INTO environments (name) VALUES ('$Name')"
		$cmd.executenonquery() | out-null
	}
	
	$conn.close()
	
	$env = get-rows $cs "select * from environments where name = '$Name'"
	return $env.environmentID
}

#================================================================================================
# Inputs 
#	$cs:	A valid connection string
#	$Name 	The name of the cluster
#	$envID  A valid environment ID
#
# Returns
# 	[int] The Id of the cluster.
#
# Details
#
#	If the cluster already exists in the database, the id of the existing one is returned.
#================================================================================================
function AddCluster ($cs , $Name, $envID) {

	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()
	$cmd = New-Object system.Data.SqlClient.sqlcommand
	$cmd.connection = $conn

	#Add environment if it isnt there already
	#if ($ENV:cbfdebug -eq "True") {write-host "select * from clusters where name = '$Name' AND environmentID = $envID"}
	$cmd.commandtext = "select * from clusters where name = '$Name' AND environmentID = $envID"

	$reader = $cmd.executereader()
	if ($reader.hasrows) { $AlreadyExists = $True}
	
	$reader.close()
	
	
	if (!($AlreadyExists -eq  $True)) {
		#if ($ENV:cbfdebug -eq "True") {Write-Host "Adding cluster $Name to db - env:$envID"}
		$cmd.commandtext = "INSERT INTO clusters (name,environmentID) VALUES ('$Name' , '$envID')"
		$cmd.executenonquery() | out-null |Out-Null
	}
	
	$conn.close()
	
	$clus = get-rows $cs "select clusterID from clusters where name = '$Name' AND environmentID = $envID"
	return $clus.clusterID
}

#================================================================================================
# Inputs 
#	$cs:	A valid connection string
#	$Name 	The name of the cluster
#	$envID  A valid environment ID
#
# Returns
# 	[int] The Id of the cluster.
#
# Details
#
#	If the cluster already exists in the database, the id of the existing one is returned.
#================================================================================================
function AddServer ($cs , $Name, $ClusID) {

	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()
	$cmd = New-Object system.Data.SqlClient.sqlcommand
	$cmd.connection = $conn

	#Add environment if it isnt there already
	#if ($ENV:cbfdebug -eq "True") {write-host "select * from servers where name = '$Name' and clusterid = $ClusID"}
	$cmd.commandtext = "select * from servers where name = '$Name' AND clusterid = $ClusID"

	$reader = $cmd.executereader()
	if ($reader.hasrows) { $AlreadyExists = $True}
	
	$reader.close()
	
	
	if (!($AlreadyExists -eq  $True)) {
		#Write-host "Adding server $Name to db - cluster:$clusID"
		$cmd.commandtext = "INSERT INTO servers (name,clusterID) VALUES ('$Name' , '$clusID')"
		$cmd.executenonquery() | out-null |Out-Null
	}
	
	$conn.close()
	
	$server = get-rows $cs "select serverID from servers where name = '$Name' AND clusterid = $ClusID"
	return $server.serverID
}

#================================================================================================
# Inputs 
#	$cs:	A valid connection string
#	$envID  A valid environment ID
#	$type   The type ID of the log (1 for events, 2 for host alarms, etc)
#
# Returns
# 	n/a
#
# Details
#
#	Persists the last time that this log source was updated
#================================================================================================
function UpdateLogTime ($cs , $envID, $type) {
	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()
	$cmd = New-Object system.Data.SqlClient.sqlcommand
	$cmd.connection = $conn
	
	$now = (Get-Date).Addhours(0)
	#$cmd.commandtext = "UPDATE collectiontimes SET timeLastCollected = '$now' WHERE environmentID = $envID and logTypeID = $type"

	$cmd.commandtext = "
	UPDATE collectiontimes SET timeLastCollected = '$now' WHERE environmentID = $envID and logTypeID = $type
	IF @@ROWCOUNT=0
    	INSERT INTO collectiontimes (logTypeID,environmentID,timeLastCollected) 
    	VALUES ($type,$envID,'$timeLastCollected')
    "

	$cmd.executenonquery() | out-null 
}

#================================================================================================
# Inputs 
#	$cs:		A valid connection string
#	$INFRServer  A valid vmware environment name
#
# Returns
# 	n/a
#
# Details
#
#	Queries VC events
#================================================================================================
function GetInfo ($cs , $INFRServer) {

	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()
	$cmd = New-Object system.Data.SqlClient.sqlcommand
	$cmd.connection = $conn

	#Add environment if it isnt there already
	$envID = AddEnvironment $cs $INFRServer
	$timeLastCollected = GetLastCollectionTime $envID 1

	$now = (Get-Date).Addhours(0)

	Write-host "Checking Events on $INFRServer"

	try {$events=Get-VIEvent -MaxSamples 1000000 -Types Error, Warning -Start ($timeLastCollected.ToString()) -Finish ($now.ToString()) -ErrorAction stop  | `
	select @{N="CreatedTime"; E={$_.CreatedTime}},
	@{N="Cluster"; E={$_.ComputeResource.Name}},
	@{N="Host"; E={$_.Host.Name}},
	@{N="FullFormattedMessage"; E={$_.FullFormattedMessage}} 
	$sortedevents=@()
	$eventobject = "" | Select CreatedTime, Cluster, Host, FullFormattedMessage, NumOccurrences
	$eventobject.CreatedTime = ""
	$eventobject.Cluster = ""
	$eventobject.Host = ""
	$eventobject.FullFormattedMessage = ""
	$eventobject.NumOccurrences = ""
	$sortedevents += $eventobject
    }
	Catch { Write-Host "Error in get VIEvent, exiting Getinfo function." 
	return $Error[0]
	}

	UpdateLogTime $cs  $envID 1
	
	foreach ($event in $events){
		
	#	Write-Host "outerloop ",$event.Host,$event.FullFormattedMessage
		$i=0
		$foundone = $false
		do {
	#	    Write-Host "innerloop ",$i,$sortedevents[$i].Host,$sortedevents[$i].FullFormattedMessage
			If (($sortedevents[$i].Host -eq $event.Host) -and ($sortedevents[$i].FullFormattedMessage -eq $event.FullFormattedMessage) ){	
			  $sortedevents[$i].NumOccurrences++
			  $foundone = $true
			}
			$i++
		} until (($i -eq $sortedevents.count) -or ($foundone))
		
		if (!$foundone){
			$eventobject = "" | Select CreatedTime, Cluster, Host, FullFormattedMessage, NumOccurrences
			$eventobject.CreatedTime = $event.CreatedTime
			$eventobject.Cluster = $event.Cluster
			$eventobject.Host = $event.Host
			$eventobject.FullFormattedMessage = $event.FullFormattedMessage
			$eventobject.NumOccurrences = 1
			$sortedevents += $eventobject
	#		Write-Host "New One ",$eventobject
		}
	}

	foreach ($event in $sortedevents) {
		
		if (($event.FullFormattedMessage) -and ($event.CreatedTime)) {
			
			if ($ENV:cbfdebug -eq "True") {Write-Host "New One ",$event}
			
			# If the cluster is in the log entry, get it from the db. If not, set it to n/a
			if (!$event.Cluster) {
				$ClusID = AddCluster $cs "n/a" $EnvID
			} else {
				$ClusID = AddCluster $cs $event.Cluster $EnvID
			}

			# If the server is in the log entry, get it from the db. If not, set it to 'VirtualCenter'
			if (!$event.Host) {
				$ServerID = AddServer $cs "VirtualCenter" $ClusID
			} else {
				$ServerID = AddServer $cs $event.Host $ClusID
			}

			if ($ENV:cbfdebug -eq "True") {Write-Host "$ServerID $ClusID"}
			
			# Set up query string
			$cmd = New-Object system.Data.SqlClient.sqlcommand
			$cmd.connection = $conn
			
			$SQLParameter1 = New-Object System.Data.SqlClient.SqlParameter("@time", $event.CreatedTime)
			$SQLParameter2 = New-Object System.Data.SqlClient.SqlParameter("@message", $event.FullFormattedMessage)
			$SQLParameter3 = New-Object System.Data.SqlClient.SqlParameter("@NumOccurrences", $event.NumOccurrences)
			[void]$cmd.Parameters.Add($SQLParameter1)
			[void]$cmd.Parameters.Add($SQLParameter2)
			[void]$cmd.Parameters.Add($SQLParameter3)			
			
			$cmd.commandtext = "INSERT INTO entries
			([time]
		   ,[description]
		   ,[serverID]
		   ,[appID]
		   ,[type]
		   ,[occurrences])
			VALUES
		   (@time
		   ,@message
		   ,'$serverID'
		   ,1
		   ,1
		   ,@numOccurrences)"
		   
		   	
			#if ($ENV:cbfdebug -eq "True") {write-host $cmd.commandtext}
			$cmd.executenonquery() | out-null

		}
	}
}

#================================================================================================
# Inputs 
#	$cs:		A valid connection string
#	$INFRServer  A valid vmware environment name
#
# Returns
# 	n/a
#
# Details
#
#	Queries VC host and datastore alarms
#================================================================================================
function GetTriggeredAlarms($cs, $INFRServer) {

	$now = Get-Date

	#Add environment if it isnt there already
	$envID = AddEnvironment $cs $INFRServer

	if ($ENV:cbfdebug -eq "True") {write-host "Creating db connection"}
	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()

	if ($ENV:cbfdebug -eq "True") {write-host "Getting service instance"}
	$serviceInstance = get-view ServiceInstance

	$alarmMgr = get-view $serviceInstance.Content.alarmManager
	$HostsViews = Get-View -ViewType hostsystem -Property TriggeredAlarmState,name
	$DatastoreViews = Get-View -ViewType Datastore -Property TriggeredAlarmState,name

	#get hostalarms
	#================================================================================================
	Write-host "Checking Host Alarms on $INFRServer"

	#collect timing values
	$timeLastCollected = GetLastCollectionTime $envID 2
	$delay = GetMinimumDelay $envID 2
	
	#If there is no delay value in the db, set to 0
	if (!$delay) {$delay = 0} 

	#calculate the minimum next collection time
	$nextCollectionTime = $timeLastCollected.addminutes($delay)
	if ($nextCollectionTime -gt $now ) {
		
		write-host "Too early to collect log type 2 on $INFRServer - next collection at $nextCollectionTime"

	} else {
		
		#update the timelastcollected value in the db
		UpdateLogTime $cs  $envID 2

		$alarms = $alarmMgr.GetAlarm($null)
		$valarms = $alarms | select value, @{N="name";E={(Get-View -Id $_).Info.Name}}
		$hostsalarms = @()
		foreach ($HostsView in $HostsViews){
            if ($HostsView.TriggeredAlarmState){
				$hostsTriggeredAlarms = $HostsView.TriggeredAlarmState
				Foreach ($hostsTriggeredAlarm in $hostsTriggeredAlarms){
					if 	($hostsTriggeredAlarm.time -gt $timeLastCollected){
						$Details = "" | Select-Object Object, Alarm, Status, Time
						$Details.Object = $HostsView.name
						$Details.Alarm = ($valarms |?{$_.value -eq ($hostsTriggeredAlarm.alarm.value)}).name
						$Details.Status = $hostsTriggeredAlarm.OverallStatus
						$Details.Time = $hostsTriggeredAlarm.time
						$hostsalarms += $Details
					}
				}
			}
		}

		If (($hostsalarms | Measure-Object).count -gt 0) {
            $hostsalarms = @($hostsalarms |sort Object)
            foreach ($hostalarm in $hostsalarms){
            	$alarmString = $hostalarm.alarm + " - " + $hostalarm.status
                addEventsToDB($INFRServer,$null,$hostalarm.Object,$hostalarm.time,$alarmstring,2)            
			}
		}   

	}
      
	
	#get datastore alarms
	#================================================================================================
	Write-host "Checking DataStore Alarms on $INFRServer"

	$timeLastCollected = GetLastCollectionTime $envID 3
	$delay = GetMinimumDelay $envID 3
	
	#If there is no delay value in the db, set to 0
	if (!$delay) {$delay = 0} 

	$nextCollectionTime = $timeLastCollected.addminutes($delay)
	
	if ($nextCollectionTime -gt $now ) {

		write-host "Too early to collect log type 3 on $INFRServer - next collection at $nextCollectionTime"
	
	} else {

		UpdateLogTime $cs  $envID 3

		$alarms = $alarmMgr.GetAlarm($null)
		$valarms = $alarms | select value, @{N="name";E={(Get-View -Id $_).Info.Name}}
		$datastoresalarms = @()
		foreach ($DatastoreView in $DatastoreViews){
            if ($DatastoreView.TriggeredAlarmState){
				$datastoresTriggeredAlarms = $DatastoreView.TriggeredAlarmState
				if ($HostsView.TriggeredAlarmState){	
					Foreach ($datastoresTriggeredAlarm in $datastoresTriggeredAlarms){
						$Details = "" | Select-Object Object, Alarm, Status, Time
						$Details.Object = $DatastoreView.name
						$Details.Alarm = ($valarms |?{$_.value -eq ($datastoresTriggeredAlarm.alarm.value)}).name
						$Details.Status = $datastoresTriggeredAlarm.OverallStatus
						$Details.Time = $datastoresTriggeredAlarm.time
						$datastoresalarms += $Details
					}
				}
			}
		}

		If (($datastoresalarms | Measure-Object).count -gt 0) {
			$datastoresalarms = @($datastoresalarms |sort Object)
            foreach ($datastorealarm in $datastoresalarms){
            		
				$alarmString = $datastorealarm.alarm + " - " + $datastorealarm.status
                addEventsToDB($INFRServer,$null,$datastorealarm.Object,$datastorealarm.time,$alarmstring,3)
			}
		}
	}
	
		
	$conn.close()
}

#================================================================================================
# Inputs 
#	$env:		[int] environment ID
#	$clus:		[int] cluster ID
#	$obj:		[obj] server ID (this can be any object that is stored in a cluster, such as a host,datastore)
#	$time:		The time of the event.
#	$Content: 	[string] The content of the message
#	$type:		[int] The log type (event, host alarm, datastore)
#
# Returns
# 	n/a
#
# Details
#
#	Stores an event in the database
#================================================================================================
function addEventsToDB($env,$clus,$obj,$time,$content,$type){
		write-host "put data in db"
        
        if (!$env) {
        	throw "No environment specified"
        } else {

        	if ($ENV:cbfdebug -eq "True") {write-host "adding $obj "}

        	#get environment ID from name
        	$envID = AddEnvironment $cs $env

        	#get cluster id from name
        	if (!$clus) {$clus = "n/a"}
			$ClusID = AddCluster $cs $clus $EnvID
			
			# If the server is in the log entry, get it from the db. If not, set it to 'VirtualCenter'
			if (!$obj) {$obj = "VirtualCenter"}
			$ServerID = AddServer $cs $obj $ClusID
			
	        # Set up query string
			$cmd = New-Object system.Data.SqlClient.sqlcommand
			$cmd.connection = $conn

			$SQLParameter1 = New-Object System.Data.SqlClient.SqlParameter("@time", $time)
			$SQLParameter2 = New-Object System.Data.SqlClient.SqlParameter("@message", $content)
			$SQLParameter3 = New-Object System.Data.SqlClient.SqlParameter("@serverID", $ServerID)
			$SQLParameter4 = New-Object System.Data.SqlClient.SqlParameter("@type", $type)

			[void]$cmd.Parameters.Add($SQLParameter1)
			[void]$cmd.Parameters.Add($SQLParameter2)
			[void]$cmd.Parameters.Add($SQLParameter3)			
			[void]$cmd.Parameters.Add($SQLParameter4)	

			$cmd.commandtext = "INSERT INTO entries
			([time]
			,[description]
		   	,[serverID]
		   	,[appID]
		   	,[occurrences]
		   	,[type])
			VALUES
		   	(@time
		   	,@message
		   	,@serverID
		   	,1
		   	,1
		   	,@type)"
		   
			#execute query
			$cmd.executenonquery() | out-null
        }
}

#================================================================================================
# Inputs 
#	$cs:		A valid connection string
#	$query:		A sql query to perform.
#
# Returns
# 	<List>[PSCustomObject]
#	Returns each row as a list item, with column names becoming the object's properties
#
# Details
#
#	General purpose SQL row getter. 
#	
#	
#================================================================================================
function get-rows ($cs ,$query) {

	$conn = New-Object system.Data.SqlClient.SqlConnection
	$conn.connectionstring = $cs
	$conn.open()
	 
	# Set up query string
	$cmd = New-Object system.Data.SqlClient.sqlcommand
	$cmd.connection = $conn
	$cmd.commandtext = $query
		
	#read column names into array $columns
	$reader = $cmd.executereader()
	$columncount = $reader.get_fieldcount()
	for ($i=0; $i -lt $columncount; $i++) {
		$columns = $columns + @(,$reader.getname($i))
	}	
	
	#read each row and create a $row object, awaiting for properties
	while ($reader.read()) {
		echo $blah
		$row = New-Object psobject
		
		#for each column, add a property and fill it with the value from the database
		foreach ($column in $columns) {
			$value = $reader.getvalue($reader.getordinal($column))
			$row | Add-Member noteproperty $column $value
		}
		#Put the row on the pipeline.
		Write-Output $row
		Remove-Variable row
	
	} 
	$reader.close()
	$conn.close()
}

#================================================================================================
# Inputs 
#	$envid:		[int] A valid environment ID
#	$type:		[int] Log type
#
# Returns
# 	[datetime]	The time at which this log was collected last
#
# Details
#
#	If one is not found, default to 24 hours ago.
#	
#================================================================================================
function GetLastCollectionTime($envID, $type){
	
	#Get the time at which stuff was last collected.
	$timeLastCollected = (get-rows $cs "select timeLastCollected from collectionTimes where environmentID = $envID AND  LogTypeID = $type").timeLastCollected

	if (!$timeLastCollected) {
		Write-Host "There was no time of last (type $type) log collection for $INFRServer. Collecting logs from past 24 hours."
		$timeLastCollected = ((Get-Date).Addhours(-24))
	}

	return $timeLastCollected

}

#================================================================================================
# Inputs 
#	$envid:		[int] A valid environment ID
#	$type:		[int] Log type
#
# Returns
# 	[datetime]	The minimum delay, in minutes that logs should be attempted to be collected
#
# Details
#
#	If one is not found, default to 0
#	
#================================================================================================
function GetMinimumDelay($envID, $type){
	
	#Get the time at which stuff was last collected.
	$minDelay = (get-rows $cs "select minimumMinutesBetweenCollections from collectionTimes where environmentID = $envID AND  LogTypeID = $type").minimumMinutesBetweenCollections

	if (!$minDelay) {
		# There was no minimum delay
		$minDelay = 0
	}

	return $minDelay
}


#MAIN SCRIPT
#================================================================================================
# Inputs 
#	Requires the following files to be in the same directory:
#		Vmware platform list (vmware-platforms.csv)
#			A csv of vc name and domain account
#		Password file (secure.csv)
#			A csv of user and account (encrypted). Use ChangeSecurePasswords.ps1 to change the
#			passwords
#
# Returns
# 	n/a
#
# Details
#
#	Pulls VC logs into a local SQL database.
#	
#================================================================================================
# Add the vmware library
Add-Pssnapin "VMware.VimAutomation.Core" -EA Silentlycontinue

# Open db connection
$cs = "Data Source=localhost;Initial Catalog=captains_log;Integrated Security=SSPI"

#read in platforms and passwords
$platforms = import-csv vmware-platforms.csv
$passwords = import-csv secure.csv

#Iterate the platforms
foreach ($p in $platforms) {
	$INFRServer = $p.vc

	#look up the password from the password file
	$pass = ($passwords | where {$_.account -eq $p.account} ).password | convertto-securestring
					#write-host ($passwords | where {$_.account -eq $p.account} ).password
					#insecure decryption routine for debugging
					#$Ptr=[System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($encryptedpass)
					#$pass = [System.Runtime.InteropServices.Marshal]::PtrToStringUni($Ptr)
					#[System.Runtime.InteropServices.Marshal]::ZeroFreeCoTaskMemUnicode($Ptr)

	#Logging into the VC
	Write-host Logging into $INFRServer as $p.account
	$user = $p.account
	$Credential = new-object -typename System.Management.Automation.PSCredential -argumentlist $user,$pass
	Connect-VIServer $p.vc -Credential $Credential | Out-Null

	#Collect ALL the data
	GetInfo $cs $INFRServer
 	GetTriggeredAlarms $cs $INFRServer
	
	#Disconnect	
	Disconnect-VIServer -Confirm:$false 
	
}

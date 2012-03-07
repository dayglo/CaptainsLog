


function read-passwords(){

	$passwords = import-csv secure.csv

	foreach ($p in $passwords) {
		$acc = $p.account
		write-host "Enter a new password for $acc, or press enter to leave the password unchanged."
		$enteredstring = read-host -assecurestring

		if ($enteredstring.length -ne 0) {
			#write-host $enteredstring
			$p.password = $enteredstring | ConvertFrom-SecureString 
			#write-host $p.password

			#debugging code to check password is going in correctly.
			#$Ptr=[System.Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($enteredstring)
			#$pass = [System.Runtime.InteropServices.Marshal]::PtrToStringUni($Ptr)
			#write-host $pass.length
			#[System.Runtime.InteropServices.Marshal]::ZeroFreeCoTaskMemUnicode($Ptr)

		}

		write-output $p
	}
}

$newpass = read-passwords

$newpass | export-csv secure.csv

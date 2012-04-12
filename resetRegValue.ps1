foreach ($num in 1..25) {

	Set-ItemProperty -path HKLM:\SYSTEM\CurrentControlSet\Control\Lsa -name DisableDomainCreds -value 0
	Start-Sleep -s 2
	write-host $num

}
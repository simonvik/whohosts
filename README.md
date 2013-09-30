whohosts
========

No to self :  whois -h whois.radb.net -i origin -T route  AS | grep -w "route:" | awk '{print $NF}' |sort -n

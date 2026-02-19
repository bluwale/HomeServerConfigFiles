# HomeServerConfigFiles

config files for all my projects inside my home server. This repo will contain all types of config files ranging from YAML, JSON, any automation scripts, experimental firewall rules and more.

each directory will have a name that will briefly explain the project, then inside will be config files used for the tunnels. There might be a markdown/readme file or something of the sort explaining what the project/service does and how it works.

any and all passwords, IP addresses, MAC addresses, ports, DNS, Hostnames etc etc are redacted.

## Ledger

EMRDemo - quick demo site I hosted for an interview for an employer

etc/Cloudflared - config files for my cloudflared proxy tunnel where I route all my DNS and Web UIs.

nextcloud-docker - config files for containerization of my nextcloud instance. Currently not in use because I dont have enough juice on my server and frankly speaking Nextcloud is horrendously optimized.

wedding-viewer - project I made for privately hosting my own live stream for my cousins wedding. Ran through Larix, open source broadcast app and hosted a python web server and page where only selected people (family members) could join. Uses HLS streaming protocols.
Next time I host the stream I'm going to add stricter authentication, right now anyone could just open source on their browser and find the password to view the stream. A fix to this is add a direct password inside the Larix setup, however I haven't figured out how to do that. Other fixes surrounding Burp Suite checks are also a viable option, will look into it when I have more time.

Immich Setup - setting up the backend and db for my Immich container. Decided to use Immich instead of Nextcloud or TrueNAS because I just wanted a Google Photos replacement so I can free up storage on my two google accounts again.

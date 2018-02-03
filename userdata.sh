#!/usr/bin/env bash
echo '*/10 * * * * /usr/bin/rsync -rt rsync://172.31.2.117:873/files/ /var/www/html/data/upload' > /tmp/rsync_crontab.txt
sudo -u ec2-user bash -c 'crontab /tmp/rsync_crontab.txt'
ssh-keyscan -t rsa gitlab.com > /root/.ssh/known_hosts
cd /var/www/html
GIT_SSH_COMMAND="ssh -i /home/ec2-user/.ssh/id_rsa -F /dev/null" git pull origin master

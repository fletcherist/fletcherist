---
title: linux
created: '2019-03-14T08:38:26.841Z'
modified: '2019-03-14T11:47:45.589Z'
---

# linux

#### chmods
```
chmod 600 file – owner can read and write
chmod 700 file – owner can read, write and execute
chmod 666 file – all can read and write
chmod 777 file – all can read, write and execute
chmod 644 I can change it, everyone else can read it.
```

#### create home + .ssh dir
`mkdir -p /home/username/.ssh`

#### remove user
```
sudo su -
userdel username

// removes user home directory
userdel - r username

```

#### create user, attach to home folder
`useradd -d /home/username username`

#### add user to sudo group
`usermod -aG sudo username`

#### set permissions
`chown -R username:username /home/username`
`chown root:root home/username`
`chmod 700 /home/username`
`chmod 644 /home/username/.ssh/authorized_keys`

#### set password
`sudo passwd username`

#### restart after updating ssh config
`systemctl restart sshd`

#### list all users
`cat /etc/passwd`

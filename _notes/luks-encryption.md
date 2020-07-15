---
title: LUKS encryption
tags:
    - luks
    - encryption
---

# {{ page.title }}

## Create encrypted file
dd if=/dev/zero of=EncryptedFile.img bs=1M count=1024.
Create device:
cryptsetup luksFormat /dev/sda2, enter password.
Opening device:
cryptsetup luksOpen /dev/sda2 some-interesting-name. After this will be created /dev/mapper/some-interesting-name, which we can mount anywhere, after creating new filesystem.
That's it.

## Mount encrypted file
cryptsetup luksOpen EncryptedFile.img secrets
mount /dev/mapper/secrets /mnt
...
umount /mnt
cryptsetup luksClose secrets

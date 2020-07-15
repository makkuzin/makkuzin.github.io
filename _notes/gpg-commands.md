---
title: Manage GPG keys
tags:
    - gpg
    - encryption
---

# {{ page.title }}

## Install
Скачиваем пакет, и проверяем свертку. Устанавливаем:
```bash
./configure && make && make install
```
Для отмены свопинга добавляем setuid к исполняемому файлу:
```bash
chmod 4755 /to/bin/file
```
Не надо использовать программу в root. Генерация ключей:
```bash
gpg --gen-key # выбираем опции в интерактивном режиме, важно выбрать хороший пароль, ограничить время действия ключей
gpg --armor --output name-for-certificate-file --gen-revoke 'words from uid' # сертификат отмены
gpg --armor --output name-for-pubkey-file --export 'words from uid' # файл с public key
gpg --keyserver someserver.pgp.net --send-keys my-email # отправка public key на keyserver,
# если в gpg.conf есть значение keyserver, оно перезаписывается указанным в command line
```

## Cryptography kindergarden
Цели PGP шифрования - конфиденциальность, целостность, неподдельность, подлинность, идентификация человека в целом.
Симметрическое и ассиметрическое шифрования, превосходство ассиметрического. Цифровые подписи для определения отправителя.
Для шифрования нужно использовать public key получателя, для подписи свой private key.
Для подписей веб страниц как правило пользуются услугами Certificate Authority центров.
Также существует Web of trust, где участники сети пользуются общими проверенными данными.
Для пользования openPGP нужно иметь - key length, key expiration, name email comment, revocation certificate.
Можно вставлять фото в публичный ключ. Лучше использовать личную переписку для обмена ключами или пользоваться keyservers.
Нельзя хранить ключи и сертификат отмены в общедоступном месте.

## Commands
gpg --import key.pub - импорт ключа
gpg --sign-key User - подпись ключа 
gpg --encrypt --sign --armor --recipient User some_file - шифрование и подпись файла
gpg --decrypt -o output some_file - расшифровка файла в файл output
gpg --fingerprint Olga - просмотр информации о Olga с fingerprint, это бывает нужно для удостоверения личности, когда сравнивается удостоверенный отпечаток с тем, что высвечивается в public key. 
gpg --list-secret-keys - просмотр закрытых ключей
keyid(идентификатор ключа) - число после /
gpg --keyserver hkp://keys.gnupg.net --send-keys 643D2243 - загрузка ключа на конкретный сервер
Пакет signing-party(pgp-tools) для работы над подписью и распространения своего ключа.
gpg-key2ps YourID | lpr - распечатка карточек с информацией о ключе
caff ID1 ID2 ID3.. - берет ключи с сервера, подписывает их, шифрует и отправляет владельцам
auto-key-retrieve - для автоматической загрузки ключа с сервера при расшифровке 
gpg --recv-keys keyid - загрузка ключа с сервера 
gpg --list-keys(--list-secret-keys) - просмотр ключей в keyring 
gpg --fingerprint - отпечаток ключа 
gpg --sign-key keyid - подпись ключа 
gpg --list-sigs keyid - просмотр подписей ключа 
gpg --send-key keyid - отправка ключа на сервер 
gpg --refresh-keys - обновление ключей
gpg --delete-keys(--delete-secret-keys) keyid - удаление ключа 
gpg --edit-key keyid - изменение ключа, help для отображения всех команд, save для сохранения, quit для выхода без изменений 
gpg --list-options show-photos --list-keys keyid - просмотр ключа вместе с фото 
gpg --update-trustdb - изменение уровня доверия каждому из ключей

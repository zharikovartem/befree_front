#!/bin/bash

# git config user.name "ArtemZharikov"
# git config user.email "a.zharikov@smartdesign.by"

read -p "Нужен ли git push? y/n:   > " isGitPush
if [[ ${isGitPush} == "y" ]]
then
    read -p "Укажите имя коммита:   > " commit
    if [[ ${commit} == "" ]]
    then
        commit="no name"
    fi

    git add .
    git commit -m "${commit}"
    # echo '7383125@mail.ru'
    # echo 'zharikovartem'
    # echo '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'
    git push
fi

npm run build

# echo  -e '\e[30;48;5;82m password: \e[0;49m derect123##!' 
scp -r ./build/* root@164.90.153.196:/var/www/befree/app/public/befree_front
# pass: derect123##!
# cd ./../var/www/crm_front_new

# ssh root@135.181.90.157    derect123##!
# ssh-copy-id root@135.181.90.157
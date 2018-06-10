# EOS IoT Payments

`front` - frontend app

`backend` - backend is EOS! EOS contracts

`device` - on-device code which sends tx to EOS

========

For calling actions from another contract caller of the first action must give authority to contract account with special permission `eosio.code`

```bash
./cleos push action eosio updateauth '{"account":"electricity","permission":"active","parent":"owner","auth":{"keys":[{"key":"EOS7oPdzdvbHcJ4k9iZaDuG4Foh9YsjQffTGniLP28FC8fbpCDgr5", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"billelectro","permission":"eosio.code"},"weight":1},{"permission":{"actor":"supplier","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p electricity
```

! Makes sure all keys are unique and sorted and all account permissions are unique and sorted and that authority can be satisfied


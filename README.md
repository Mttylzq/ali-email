# ali-sms
[![build status][travis-image]][travis-url]
[travis-image]: https://travis-ci.org/tsq-old/ali-sms.svg?branch=master
[travis-url]: https://travis-ci.org/tsq-old/ali-sms


Nodejs SDK for [Aliyun DirectMail service](https://help.aliyun.com/document_detail/29439.html?spm=5176.doc29438.2.1.bOoMjN)

## Install

```
npm install ali-email
```

## Usage
###SingleSendMail
```javascript
var aliEmail = require("./index");
var accessKeyID     = process.env.ALI_SMS_ACCESSKEYID ;
var accessKeySecret = process.env.ALI_SMS_ACCESSKEYSECRET ;

var configSingle = {
    action            :'SingleSendMail',
    accessKeyID       : accessKeyID,
    accessKeySecret   : accessKeySecret,
    accountName       :'service@abc.com',
    replyToAddress    :true,
    addressType       :0,
    toAddress         :'abc@abc.com',
    fromAlias         :'sendEmailFromAlias',
    subject           :'subject',
    textBody          :'test'
};
aliEmail(configSingle, function(err, body) {
    console.log(err);
    console.log(body);
});
```
###BatchSendMail
```javascript
var aliEmail = require("./index");
var accessKeyID     = process.env.ALI_SMS_ACCESSKEYID || 'bVMwAU5StA8XpohG';
var accessKeySecret = process.env.ALI_SMS_ACCESSKEYSECRET || 'dibXGzHwcaIjrPhgGkXUX9cBYGU4Lb';

var configSingle = {
    action            :'BatchSendMail',
    accessKeyID       : accessKeyID,
    accessKeySecret   : accessKeySecret,
    accountName       :'service@abc.com',
    templateName      :'test',
    receiversName      :'test',
};
aliEmail(configSingle, function(err, body){
    console.log(err);
    console.log(body);
});

```

## Config 
[Aliyun DirectMail service](https://help.aliyun.com/document_detail/29439.html?spm=5176.doc29438.2.1.bOoMjN)

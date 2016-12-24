/**
 * Created by luzq on 2016/12/24.
 */
const crypto  = require("crypto");
const request = require("request");
const debug   = require('debug')('email');

const url             = 'http://dm.aliyuncs.com/';

module.exports = function (config, cb) {
    const nonce           = Date.now();
    const date            = new Date();
    const errorMsg = [];
    config = config || {};
    if (!config.accessKeyID) {
        errorMsg.push('accessKeyID required');
    }
    if (!config.accessKeySecret) {
        errorMsg.push('accessKeySecret required');
    }
    if(!config.accountName){
        errorMsg.push('accountName required')
    }
    var param = {

    };
    if(config.action == 'SingleSendMail'){
        if(!config.toAddress){
            errorMsg.push('toAddress required')
        }
        param = {
            AccessKeyId: config.accessKeyID,
            Action: 'SingleSendMail',
            Format: 'JSON',
            AccountName:config.accountName,
            ReplyToAddress:!!config.replyToAddress,
            AddressType:typeof config.addressType == 'undefined'? 0 : config.addressType,
            ToAddress:config.toAddress,
            SignatureMethod: 'HMAC-SHA1',
            SignatureNonce: nonce,
            SignatureVersion: '1.0',
            TemplateCode: config.templateCode,
            Timestamp: date.toISOString(),
            Version: '2015-11-23'
        };
        if(config.fromAlias){
            param.FromAlias = config.fromAlias;
        }
        if(config.subject){
            param.Subject = config.subject;
        }
        if(config.htmlBody){
            param.HtmlBody = config.htmlBody;
        }
        if(config.textBody){
            param.TextBody = config.textBody;
        }
    }else if(config.action == 'BatchSendMail'){
        if(!config.templateName){
            errorMsg.push('templateName required')
        }
        if(!config.receiversName){
            errorMsg.push('receiversName required')
        }
        param = {
            AccessKeyId: config.accessKeyID,
            Action: 'BatchSendMail',
            Format: 'JSON',
            AccountName:config.accountName,
            AddressType:typeof config.addressType == 'undefined'? 0 : config.addressType,

            TemplateName:config.templateName,
            ReceiversName:config.receiversName,

            SignatureMethod: 'HMAC-SHA1',
            SignatureNonce: nonce,
            SignatureVersion: '1.0',
            TemplateCode: config.templateCode,
            Timestamp: date.toISOString(),
            Version: '2015-11-23'
        };
        if(config.tagName){
            param.TagName = config.tagName;
        }

    }else{
        cb('error action',null);
    }
    if (errorMsg.length) {
        return cb(errorMsg.join(','));
    }
    var signStr = [];
    for (var i in param) {
        signStr.push(encodeURIComponent(i)+'='+encodeURIComponent(param[i]));
    }
    signStr.sort()
    signStr = signStr.join('&');
    signStr = 'POST&%2F&' + encodeURIComponent(signStr);
    const sign = crypto.createHmac("sha1", config.accessKeySecret + '&')
        .update(signStr)
        .digest('base64');
    const signature = encodeURIComponent(sign);
    var reqBody = ['Signature='+signature];
    for (var i in param) {
        reqBody.push(i+'='+param[i]);
    }
    reqBody = reqBody.join('&');
    debug('signature: %s', signature);
    debug('request body: %s', reqBody);
    request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: url,
        body: reqBody,
        method: 'POST'
    }, function (err, res, body) {
        cb(err, body);
    })
};

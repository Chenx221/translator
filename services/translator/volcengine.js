const crypto = require('crypto');

class Client {
    static async translate(text) {
        const endpoint = process.env.VOLCENGINE_MT_ENDPOINT;
        const accessKeyId = process.env.VOLCENGINE_ACCESS_KEY_ID;
        const secretAccessKey = process.env.VOLCENGINE_SECRET_ACCESS_KEY;
        const sourceLanguage = process.env.VOLCENGINE_SOURCE_LANGUAGE;
        const targetLanguage = process.env.VOLCENGINE_TARGET_LANGUAGE;

        const date = new Date();
        const dateStr = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const datestamp = dateStr.substring(0, 8);

        let payload;
        if (sourceLanguage !== "auto")
            payload = JSON.stringify({
                Action: 'TranslateText',
                Version: '2020-06-01',
                TargetLanguage: targetLanguage,
                SourceLanguage: sourceLanguage,
                TextList: [text]
            });
        else
            payload = JSON.stringify({
                Action: 'TranslateText',
                Version: '2020-06-01',
                TargetLanguage: targetLanguage,
                TextList: [text]
            });

        const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');

        const region = 'cn-beijing';
        const service = 'translate';

        const host = endpoint;
        const method = 'POST';
        const canonicalUri = '/';
        const canonicalQueryString = 'Action=TranslateText&Version=2020-06-01';

        const canonicalHeaders = `host:${host}\nx-content-sha256:${payloadHash}\nx-date:${dateStr}\n`;
        const signedHeaders = 'host;x-content-sha256;x-date';

        const canonicalRequest = this.GetCanonicalRequest(
            method, canonicalUri, canonicalQueryString, canonicalHeaders, signedHeaders, payloadHash
        );

        const credentialScope = `${datestamp}/${region}/${service}/request`;
        const stringToSign = this.GetStringToSign('HMAC-SHA256', dateStr, credentialScope, canonicalRequest);
        const signingKey = this.GetkSigning(secretAccessKey, datestamp, region, service);
        const signature = this.GetSignature(signingKey, stringToSign);

        const authorization = this.GetAuthorization(accessKeyId, credentialScope, signedHeaders, signature);
        const response = await fetch(`https://${endpoint}/?${canonicalQueryString}`, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json',
                'Host': host,
                'X-Content-Sha256': payloadHash,
                'X-Date': dateStr
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`ERROR! Status: ${response.status}`);
        }
        return response.json();
    }

    //Authorization: HMAC-SHA256 Credential={AccessKeyId}/{CredentialScope}, SignedHeaders={SignedHeaders}, Signature={Signature}
    static GetAuthorization(accessKeyId, credentialScope, signedHeaders, signature) {
        return `HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    }

    //CanonicalRequest = HTTPRequestMethod + '\n' + CanonicalURI + '\n' + CanonicalQueryString + '\n' + CanonicalHeaders + '\n' +SignedHeaders + '\n' + HexEncode(Hash(RequestPayload))
    static GetCanonicalRequest(method, canonicalUri, canonicalQueryString, canonicalHeaders, signedHeaders, payloadHash) {
        return `${method}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    }

    //StringToSign = Algorithm + '\n' + RequestDate + '\n' + CredentialScope + '\n' + HexEncode(Hash(CanonicalRequest))
    static GetStringToSign(algorithm, requestDate, credentialScope, canonicalRequest) {
        const hashedRequest = crypto.createHash('sha256')
            .update(canonicalRequest)
            .digest('hex');
        return `${algorithm}\n${requestDate}\n${credentialScope}\n${hashedRequest}`;
    }

    //Signature = HexEncode(HMAC(kSigning, StringToSign))
    static GetSignature(kSigning, stringToSign) {
        return crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
    }

    // kSigning = HMAC(HMAC(HMAC(HMAC(Secret Access Key, Date), Region), Service), "request")
    static GetkSigning(secretAccessKey, date, region, service) {
        const kDate = crypto.createHmac('sha256', secretAccessKey).update(date).digest();
        const kRegion = crypto.createHmac('sha256', kDate).update(region).digest();
        const kService = crypto.createHmac('sha256', kRegion).update(service).digest();
        return crypto.createHmac('sha256', kService).update('request').digest();
    }

}

module.exports = Client;
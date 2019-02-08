import {HttpUrlEncodingCodec} from '@angular/common/http';

export class AppHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
    encodeKey(k: string): string {
        return super.encodeKey(k)
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    }
}

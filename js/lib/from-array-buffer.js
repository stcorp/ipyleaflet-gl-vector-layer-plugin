function asciiDecode(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function readUint16LE(buffer) {
    var view = new DataView(buffer);
    var val = view.getUint8(0);
    val |= view.getUint8(1) << 8;
    return val;
}

export function fromArrayBuffer(buf) {
    var magic = asciiDecode(buf.slice(0,6));
    if (magic.slice(1,6) != 'NUMPY') {
        throw new Error('unknown file type');
    }

    var version = new Uint8Array(buf.slice(6,8)),
        headerLength = readUint16LE(buf.slice(8,10)),
        headerStr = asciiDecode(buf.slice(10, 10+headerLength));
    var offsetBytes = 10 + headerLength;
    //rest = buf.slice(10+headerLength);  XXX -- This makes a copy!!! https://www.khronos.org/registry/typedarray/specs/latest/#5

    var info =  JSON.parse(headerStr.toLowerCase().replace('(','[').replace(',),',']').replace('),',']').replace(/'/g,"\""));

    // Intepret the bytes according to the specified dtype
    var data;
    if (info.descr === "|u1") {
        data = new Uint8Array(buf, offsetBytes);
    } else if (info.descr === "|i1") {
        data = new Int8Array(buf, offsetBytes);
    } else if (info.descr === "<u2") {
        data = new Uint16Array(buf, offsetBytes);
    } else if (info.descr === "<i2") {
        data = new Int16Array(buf, offsetBytes);
    } else if (info.descr === "<u4") {
        data = new Uint32Array(buf, offsetBytes);
    } else if (info.descr === "<i4") {
        data = new Int32Array(buf, offsetBytes);
    } else if (info.descr === "<f4") {
        data = new Float32Array(buf, offsetBytes);
    } else if (info.descr === "<f8") {
        data = new Float64Array(buf, offsetBytes);
    } else {
        throw new Error('unknown numeric dtype')
    }

    return {
        shape: info.shape,
        fortran_order: info.fortran_order,
        data: data ,
        get : function(x,y){
            if (this.shape.length == 2)
                return this.data[x*this.shape[0]+y]
            if (this.shape.length == 1)
                return this.data[x]},
        dim : function(){
            return this.shape.length}

    };
}


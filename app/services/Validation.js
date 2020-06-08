function Validation() {
    //phương thức
    this.kiemTraRong = function (inputVal, tagID, message) {
        if (inputVal === "") {
            getEle(tagID).style.display = "block";
            getEle(tagID).innerHTML = message;
            return false;
        }
        getEle(tagID).style.display = "none";
        return true;
    }

    this.kiemTraTaiKhoan = function (inputVal, tagID, message, mangND) {
        var isExist = mangND.some(function (item) {
            return inputVal === item._taiKhoan;
        });

        if (isExist) {
            getEle(tagID).style.display = "block";
            getEle(tagID).innerHTML = message;
            return false;
        }
        getEle(tagID).style.display = "none";
        return true;
    }

    this.kiemTraChuoi = function (inputVal, tagID, message) {
        var pattern = new RegExp(

            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        );
        if (pattern.test(inputVal)) {
            getEle(tagID).style.display = "none";
            return true;
        }
        getEle(tagID).style.display = "block";
        getEle(tagID).innerHTML = message;
        return false;
    }

    this.kiemTraEmail = function (inputVal, tagID, message) {
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        //email hợp lệ
        if (inputVal.match(emailPattern)) {
            getEle(tagID).style.display = "none";
            return true;
        }
        //không hợp lệ
        getEle(tagID).style.display = "block";
        getEle(tagID).innerHTML = message;
        return false;
    }

    this.kiemTraDoDaiChuoi = function (inputVal, tagID, message, min, max) {
        // hợp lệ 
        if (inputVal.length >= min && inputVal.length <= max) {
            getEle(tagID).style.display = "none";
            return true;
        }
        getEle(tagID).style.display = "block";
        getEle(tagID).innerHTML = message;
        return false;
    }

    this.kiemTraSoDienThoai = function(inputVal, tagID, message){
        var pattern = new RegExp(/^\d+$/);
        if (pattern.test(inputVal)&& this.kiemTraDoDaiChuoi(inputVal, tagID, message, 9, 11)) {
            getEle(tagID).style.display = "none";
            return true;
        }
        getEle(tagID).style.display = "block";
        getEle(tagID).innerHTML = message;
        return false;
    }
}
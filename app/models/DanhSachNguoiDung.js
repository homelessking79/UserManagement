function DanhSachNguoiDung() {
    // thuộc tính
    this.mangND = [];
    //phương thức
    this.themND = function (nd) {
        this.mangND.push(nd);
    }


    this.timViTriND = function (taiKhoan) {
        viTri = -1;
        for (i = 0; i < this.mangND.length; i++) {
            if (this.mangND[i]._taiKhoan === taiKhoan) {
                viTri = i;
            }
        }
        return viTri;
    }

    this.xoaND = function (taiKhoan) {
        var viTri = this.timViTriND(taiKhoan);
        this.mangND.splice(viTri, 1);
    }

    this.layThongTinND = function (taiKhoan) {
        var viTri = this.timViTriND(taiKhoan);
        if (viTri !== -1) {
            return this.mangND[viTri];
        }
    }

    this.capNhatND = function (viTri, nd) {
        this.mangND[viTri] = nd;
    }
}


DanhSachNguoiDung.prototype.timKiemNguoiDung = function (hoTen) {
    var mangTimKiem = [];
    this.mangND.map(function (item) {
        if (changeVie(item._hoTen).indexOf(changeVie(hoTen)) > -1) {
            mangTimKiem.push(item);
        }
    });
    return mangTimKiem;
}

//Hàm chuyển chữ tiếng việt 
function changeVie(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
}
//  console.log(changeVie("Nguyễn Như Quỳnh"));
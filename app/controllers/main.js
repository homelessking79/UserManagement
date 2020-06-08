//Hàm lấy phần tử bằng ID
var ds = new DanhSachNguoiDung;
var viTri = -1;
var validation = new Validation();
//khi cập nhật, nếu ko có thay đổi nào ở ô tài khoản thì change = false, mặc định change = true
var change = true;
function getEle(id) {
    return document.getElementById(id);
}
//Lấy data từ local storage
getLocalStorage();

//Xử lý khi chọn nút thêm ng dùng sẽ reset lại form, thay nút cập nhật thành nút thêm 
getEle("btnThemNguoiDung").addEventListener("click", function () {
    getEle("btnThemND").style.display = "block";
    getEle("btnCapNhat").style.display = "none";
    resetForm();
    viTri = -1;
    clearThongBao();
})

//Xử lý khi chọn nút thêm
getEle("btnThemND").addEventListener("click", function () {
    themNguoiDung();
    hienThi(ds.mangND);
    setLocalStorage();
})

//Xử lý khi cập nhật người dùng
getEle("btnCapNhat").addEventListener("click", function () {
    capNhatNguoiDung();
    hienThi(ds.mangND);
    setLocalStorage();
    change = true;
})

// Xử lý khi nhấn nút search 
getEle("basic-addon2").addEventListener("click", function(){
    var hoTen = getEle("searchInput").value;
    var mangTimKiem = ds.timKiemNguoiDung(hoTen);
    hienThi(mangTimKiem);
})

// Xử lý sau khi gõ tên ng dùng cần tìm kiếm
getEle("searchInput").addEventListener("keyup", function(){
    var hoTen = getEle("searchInput").value;
    var mangTimKiem = ds.timKiemNguoiDung(hoTen);
    hienThi(mangTimKiem);
})

//Khi nhấn vào tab Danh sách người dùng sẽ thoát khỏi danh sách tìm kiếm
getEle("DSND").addEventListener("click", function(){
    hienThi(ds.mangND);
    getEle("searchInput").value = "";
})



//khai báo hàm
function themNguoiDung() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var sdt = getEle("SoDienThoai").value;
    var isValid = kiemTra(taiKhoan, hoTen, matKhau, email, sdt, change);
    if (isValid) {
        var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt);
        ds.themND(nd);
    }
}

function hienThi(mangND) {
    var tbody = getEle("tblDanhSachNguoiDung");
    var content = "";

    var stt = 1;
    mangND.map(function (item, index) {

        content += `
        <tr>
            <td>${stt}</td>
            <td>${item._taiKhoan}</td>
            <td>${item._matKhau}</td>
            <td>${item._hoTen}</td>
            <td>${item._email}</td>
            <td>${item._sdt}</td>
            <td class = "text-center">
            <button class="btn btn-success"  data-toggle="modal"
            data-target="#myModal" onclick="hienThongTinND('${item._taiKhoan}')">Sửa</button>
            <button class="btn btn-danger" onclick="xoaND('${item._taiKhoan}')">Xóa</button>
            </td>
        </tr>
        `
        stt++;
    })
    tbody.innerHTML = content;

}

function setLocalStorage() {
    localStorage.setItem("DSND", JSON.stringify(ds.mangND));
}

function getLocalStorage() {
    if (localStorage.getItem("DSND")) {
        ds.mangND = JSON.parse(localStorage.getItem("DSND"));
        hienThi(ds.mangND);
    }
}

function xoaND(taiKhoan) {
    ds.xoaND(taiKhoan);
    setLocalStorage();
    hienThi(ds.mangND);

}

function hienThongTinND(taiKhoan) {
    getEle("btnThemND").style.display = "none";
    getEle("btnCapNhat").style.display = "block";
    var nguoiDung = ds.layThongTinND(taiKhoan);

    getEle("TaiKhoan").value = nguoiDung._taiKhoan;
    getEle("MatKhau").value = nguoiDung._matKhau;
    getEle("HoTen").value = nguoiDung._hoTen;
    getEle("Email").value = nguoiDung._email;
    getEle("SoDienThoai").value = nguoiDung._sdt;
    viTri = ds.timViTriND(getEle("TaiKhoan").value);
    clearThongBao();
}

function resetForm() {
    getEle("TaiKhoan").value = "";
    getEle("MatKhau").value = "";
    getEle("HoTen").value = "";
    getEle("Email").value = "";
    getEle("SoDienThoai").value = "";
}

function clearThongBao() {
    getEle("tbTaiKhoan").style.display = "none";
    getEle("tbMatKhau").style.display = "none";
    getEle("tbHoTen").style.display = "none";
    getEle("tbEmail").style.display = "none";
    getEle("tbSoDienThoai").style.display = "none";
}

function capNhatNguoiDung() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var sdt = getEle("SoDienThoai").value;
    // console.log(taiKhoan + " " + hoTen + " " + matKhau + " " + email + " " + sdt);
    //Tránh lỗi thông báo tài khoản bị trùng do không thay đổi gì
    if (taiKhoan === ds.mangND[viTri]._taiKhoan) {
        change = false;
    }
    var isValid = kiemTra(taiKhoan, hoTen, matKhau, email, sdt, change);
    if (isValid){
        var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt);
        ds.capNhatND(viTri, nd);
    }
}

//Hàm validation
function kiemTra(taiKhoan, hoTen, matKhau, email, sdt, change){
    var isValid = true;
    //chỉ kiểm tra ô taiKhoan khi người dùng có cập nhật   
    if (change){
        //tài khoản không được rỗng, không được trùng
        isValid &=validation.kiemTraRong(taiKhoan, "tbTaiKhoan", "Tài khoản không được để trống")&&validation.kiemTraTaiKhoan(taiKhoan, "tbTaiKhoan", "Tài khoản bị trùng", ds.mangND);
    }
    //Họ tên không được rỗng và phải là dạng chuỗi ký tự ko chứa số
    isValid &= validation.kiemTraRong(hoTen, "tbHoTen", "Họ tên không được để trống") && validation.kiemTraChuoi(hoTen, "tbHoTen", "Họ tên không hợp lệ");
    //Mật khẩu không được rỗng và chỉ đc dài từ 6 - 9 ký tự
    isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "Mật khẩu không được để trống")&&validation.kiemTraDoDaiChuoi(matKhau, "tbMatKhau", "Mật khẩu chỉ từ 6 - 9 ký tự", 6, 8);
    //Email không được rỗng và phải có dạng abc@example.com
    isValid &= validation.kiemTraRong(email, "tbEmail", "Email không được để trống")&& validation.kiemTraEmail(email,"tbEmail","Email không hợp lệ");
    //Số điện thoại không được rỗng và phải là dạng số từ 9 - 11 số
    isValid &= validation.kiemTraRong(sdt, "tbSoDienThoai", "Số điện thoại không được để trống")&&validation.kiemTraSoDienThoai(sdt, "tbSoDienThoai", "Số điện thoại không hợp lệ");
    return isValid;
}

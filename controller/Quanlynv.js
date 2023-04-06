var arrNhanVien = [];

document.querySelector('#btnThem').onclick = function () {
    document.querySelector('#btnCapNhat').disabled = true;
    document.querySelector('#formThemSinhVien').reset();
    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('#tknv').disabled = false;
}   

//in nhan vien len giao dien 
document.querySelector('#btnThemNV').onclick = function () {
    // event.preventDeFault();
    console.log(123);
    var nv = new NhanVien();
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoVaTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.LuongCoBan = +document.querySelector('#luongCB').value;
    nv.LuongCoBanChuoi = document.querySelector('#luongCB').value;

    nv.heSoLuong = +document.querySelector('#chucvu').value;


    var slChucVu = document.querySelector('#chucvu')
    var viTriOpTion = slChucVu.selectedIndex;
    nv.chucVu = slChucVu[viTriOpTion].innerHTML;
    nv.gioLam = +document.querySelector('#gioLam').value
    nv.gioLamChuoi = document.querySelector('#gioLam').value


    
    var valid = true;

    var taiKhoanNV = document.getElementById('ptknv');
    var pTaiKhoanNhanVien = taiKhoanNV.getAttribute('name');
    var testTK = document.getElementById('testTK');
    var testDoDaiTK = document.getElementById('testDoDaiTK');

    var hoVaTenNV = document.getElementById('pname');
    var pHoVaTenNV = hoVaTenNV.getAttribute('name');
    var testName = document.getElementById('testName');

    var emailNV = document.getElementById('pemail');
    var pEmail = emailNV.getAttribute('name');
    var testEmail = document.getElementById('testEmail');

    var matKhauNV = document.getElementById('Ppassword');
    var pMatKhauNV = matKhauNV.getAttribute('name')
    var testMatKhau = document.getElementById('testMatKhau');

    var luongCbNV = document.getElementById('pluongCB');
    var pLuongcbNV = luongCbNV.getAttribute('name')
    var testLuongCB = document.getElementById('testLuongCB');

    var gioLamNV = document.getElementById('pgioLam');nUpDate
    var pGioLamNV = gioLamNV.getAttribute('name');
    var testGioLam = document.getElementById('ktGioLam');

    var ngayLamNV = document.getElementById('pdatepicker');
    var pNgayLamNV = ngayLamNV.getAttribute('name');
    var testNgayLam = document.getElementById('ktNgayLam');

    var chucVuNV = document.getElementById('pchucvu')
   


      valid = checkRong(nv.hoVaTen, hoVaTenNV.id, pHoVaTenNV)
        & checkRong(nv.taiKhoan, taiKhoanNV.id, pTaiKhoanNhanVien)
        & checkRong(nv.email, emailNV.id, pEmail)
        & checkRong(nv.matKhau, matKhauNV.id, pMatKhauNV)
        & checkRong(nv.ngayLam, ngayLamNV.id, pNgayLamNV)
        & checkRong(nv.LuongCoBanChuoi, luongCbNV.id, pLuongcbNV)
        & checkRong(nv.gioLamChuoi, gioLamNV.id, pGioLamNV);

     valid = valid & kiemTraSo(nv.taiKhoan,testTK.id) 
     & kiemTraDoDai(nv.taiKhoan,testDoDaiTK.id, 4) 
   

    valid = valid & checkEmail(nv.email, testEmail.id);

    valid = valid & checkName(nv.hoVaTen, testName.id);

    valid = valid & kiemTraKhoang(nv.gioLam, testGioLam.id, 80, 200)
     & kiemTraKhoang(nv.LuongCoBan, testLuongCB.id, 1e+6, 2e+7);

    valid = valid & kiemtraMatKhau(nv.matKhau, testMatKhau.id)

    valid = valid & kiemTraChucVu(viTriOpTion,chucVuNV.id)

    valid = valid & kiemTraNgayLam(nv.ngayLam, testNgayLam.id)
    
    


   

    if (!valid) {
        return;
    }
    


    
    //dua du lieu vao array sau moi lan them du lieu 
    arrNhanVien.push(nv);
    saveStorage();

    console.log(nv);
    renderNhanVien(arrNhanVien);

    document.querySelector('#formThemSinhVien').reset();
 
   


}





function renderNhanVien(arrNV) {
    var htmlContent = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nvNew = new NhanVien()
        var nv = arrNV[index]
        Object.assign(nvNew, nv);
        htmlContent += `
        <tr>
         <td>${nvNew.taiKhoan}</td>
         <td>${nvNew.hoVaTen}</td>
         <td>${nvNew.email}</td>
         <td>${nvNew.ngayLam}</td>
         <td>${nvNew.chucVu}</td>
         <td>${nvNew.tinhTongLuong()}</td>
         <td id = "xepLoaiNV">${nvNew.xepLoai()}</td>
         <td><button class ="btn btn-success" onclick ="xoaNhanVien('${nvNew.taiKhoan}')">Xoa</button></td>
         <td><button class="btn btn-primary" data-toggle="modal"
         data-target="#myModal" onclick= "suaSinhVien('${nvNew.taiKhoan}')">Chinh sua</button></td>
        </tr>
        `
    }
    document.querySelector('#tableDanhSach').innerHTML = htmlContent;

    return htmlContent;

}




function xoaNhanVien(tkNV) {
    var indexXoa = -1
    for (var index = 0; index < arrNhanVien.length; index++) {
        var svXoa = arrNhanVien[index]
        if (svXoa.taiKhoan === tkNV) {
            indexXoa = index
            break;
        }
    }
    if (indexXoa !== -1) {
        arrNhanVien.splice(indexXoa, 1);
        renderNhanVien(arrNhanVien);
    }
}




function suaSinhVien(maNVCLick) {
    
    document.querySelector('#btnCapNhat').disable = false;
    console.log(maNVCLick);
    var indexSua = -1;
    for (var index = 0; index < arrNhanVien.length; index++) {
        if (arrNhanVien[index].taiKhoan === maNVCLick) {
            indexSua = index
            break;
        }

    }

    if (indexSua !== -1) {
        document.querySelector('#tknv').value = arrNhanVien[indexSua].taiKhoan;

        document.querySelector('#name').value = arrNhanVien[indexSua].hoVaTen;
        document.querySelector('#email').value = arrNhanVien[indexSua].email;
        document.querySelector('#password').value = arrNhanVien[indexSua].matKhau;
        document.querySelector('#datepicker').value = arrNhanVien[indexSua].ngayLam;
        document.querySelector('#luongCB').value = arrNhanVien[indexSua].LuongCoBan;
        document.querySelector('#chucvu').value = arrNhanVien[indexSua].heSoLuong;
        document.querySelector('#gioLam').value = arrNhanVien[indexSua].gioLam;


        document.querySelector('#btnThemNV').disabled = true;
        document.querySelector('#tknv').disabled = true;

    }


   document.querySelector('#btnCapNhat').disabled = false;

}

document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVienEdit = new NhanVien;
    nhanVienEdit.taiKhoan = document.querySelector('#tknv').value;
    nhanVienEdit.hoVaTen = document.querySelector('#name').value;
    nhanVienEdit.email = document.querySelector('#email').value;
    nhanVienEdit.matKhau = document.querySelector('#password').value;
    nhanVienEdit.ngayLam = document.querySelector('#datepicker').value;
    nhanVienEdit.LuongCoBan = +document.querySelector('#luongCB').value;
    nhanVienEdit.LuongCoBanChuoi = document.querySelector('#luongCB').value;

    nhanVienEdit.heSoLuong = document.querySelector('#chucvu').value;
    var slChucVu = document.querySelector('#chucvu')
    var viTriOpTion = slChucVu.selectedIndex;
    nhanVienEdit.chucVu = slChucVu[viTriOpTion].innerHTML
    nhanVienEdit.gioLam = +document.querySelector('#gioLam').value;
    nhanVienEdit.gioLamChuoi = document.querySelector('#gioLam').value;

     //validation
    var valid = true;
   
    if (viTriOpTion === 0) {
        document.querySelector('#pchucvu').innerHTML = 'Vui lòng chọn chức vụ'
        valid = false;

    } else {
        document.querySelector('#pchucvu').innerHTML = ''
        valid = true;

    }

    var hoVaTenNV = document.getElementById('pname');
    var pHoVaTenNV = hoVaTenNV.getAttribute('name');
    var testName = document.getElementById('testName');

    var emailNV = document.getElementById('pemail');
    var pEmail = emailNV.getAttribute('name');
    var testEmail = document.getElementById('testEmail');

    var matKhauNV = document.getElementById('Ppassword');
    var pMatKhauNV = matKhauNV.getAttribute('name')
    var testMatKhau = document.getElementById('testMatKhau');

    var luongCbNV = document.getElementById('pluongCB');
    var pLuongcbNV = luongCbNV.getAttribute('name')
    var testLuongCB = document.getElementById('testLuongCB');

    var gioLamNV = document.getElementById('pgioLam');
    var pGioLamNV = gioLamNV.getAttribute('name');
    var testGioLam = document.getElementById('ktGioLam');

    var ngayLamNV = document.getElementById('pdatepicker');
    var pNgayLamNV = ngayLamNV.getAttribute('name');
    var testNgayLam = document.getElementById('ktNgayLam');




    valid = checkRong(nhanVienEdit.hoVaTen, hoVaTenNV.id, pHoVaTenNV)
        & checkRong(nhanVienEdit.email, emailNV.id, pEmail)
        & checkRong(nhanVienEdit.matKhau, matKhauNV.id, pMatKhauNV)
        & checkRong(nhanVienEdit.ngayLam, ngayLamNV.id, pNgayLamNV)
        & checkRong(nhanVienEdit.LuongCoBanChuoi, luongCbNV.id, pLuongcbNV)
        & checkRong(nhanVienEdit.gioLamChuoi, gioLamNV.id, pGioLamNV)

    valid = valid & checkEmail(nhanVienEdit.email, testEmail.id);

    valid = valid & checkName(nhanVienEdit.hoVaTen, testName.id);
 
    valid = valid & kiemTraKhoang(nhanVienEdit.gioLam, testGioLam.id, 80, 200)
        & kiemTraKhoang(nhanVienEdit.LuongCoBan, testLuongCB.id, 1e+6, 2e+7)

    valid = valid & kiemtraMatKhau(nhanVienEdit.matKhau, testMatKhau.id)

    valid = valid & kiemTraNgayLam(nhanVienEdit.ngayLam, testNgayLam.id)




    if (!valid) {
        return;
    }






    for (var index = 0; index < arrNhanVien.length; index++) {
        if (arrNhanVien[index].taiKhoan === nhanVienEdit.taiKhoan) {
            var nvMang = arrNhanVien[index];
            nvMang.hoVaTen = nhanVienEdit.hoVaTen;
            nvMang.email = nhanVienEdit.email;
            nvMang.matKhau = nhanVienEdit.matKhau;
            nvMang.ngayLam = nhanVienEdit.ngayLam;
            nvMang.chucVu = nhanVienEdit.chucVu;
            nvMang.gioLam = nhanVienEdit.gioLam;
            nvMang.gioLamChuoi = nhanVienEdit.gioLamChuoi;

            nvMang.LuongCoBan = nhanVienEdit.LuongCoBan;
            nvMang.LuongCoBanChuoi = nhanVienEdit.LuongCoBanChuoi;


            nvMang.heSoLuong = nhanVienEdit.heSoLuong;


            break;
        }

    }

    


    document.querySelector('#btnThemNV').disabled = true;
    document.querySelector('#tknv').disabled = true;
    saveStorage();
    renderNhanVien(arrNhanVien);


}


function saveStorage() {
    var sArrNhanVien = JSON.stringify(arrNhanVien);
    console.log(sArrNhanVien);
    localStorage.setItem('arrNhanVien', sArrNhanVien);
}


function getStorage() {
    if (localStorage.getItem('arrNhanVien')) {
        var stringArrNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(stringArrNhanVien);
    }

}

getStorage()
renderNhanVien(arrNhanVien);



//Tìm nhân viên theo loại

document.querySelector('#searchType').oninput = function () {
    var tuKhoa = document.querySelector('#searchType').value.trim();
    tuKhoa = stringToSlug(tuKhoa);
    var arrNhanVienTk = [];


    for (var index = 0; index < arrNhanVien.length; index++) {
        var nvTim = new NhanVien()
        var nv = arrNhanVien[index]
        Object.assign(nvTim, nv);
        console.log(nvTim.xepLoai())
        if (stringToSlug(nvTim.xepLoai().trim()).search(tuKhoa) !== -1) {
            arrNhanVienTk.push(nv);
        }

    }

    renderNhanVien(arrNhanVienTk);
}



document.getElementById('showPassWord').onclick = function () {
    var x = document.getElementById('password') ;
    if (x.type === "password") {
     x.type = "text";
     document.querySelector('#showPassWord').style.color = 'red'
    }else {
     x.type = "password";
     document.querySelector('#showPassWord').style.color = 'blue'
    }
 }

//Dong function
document.querySelector('#btnDong').onclick = function () {
    const PvaLiDaTion = document.querySelectorAll(".validation-text");
    for (var i = 0; i < PvaLiDaTion.length; i++) {
        PvaLiDaTion[i].innerHTML = "";
}
}
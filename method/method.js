//string to slug

function stringToSlug(title) 
{
    //Chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Chuyển ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}




//validation

function checkRong(value, id, name) {

    if (value.trim() == '') 
    {
        document.querySelector(`#${id}`).innerHTML = ` ${name} không được bỏ trống`
        return false;
    } 
    else 
    {
        document.querySelector(`#${id}`).innerHTML = '';
        return true;

    }
}




function checkEmail(value, id) 
{
    var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regexEmail.test(value)) 
    {
        document.querySelector(`#${id}`).innerHTML = '';
        return true;
    }

    document.querySelector(`#${id}`).innerHTML = 'Sai định dang Email'
    return false;
}




function checkName(value, id) 
{
    var regexLetter = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/


    if (regexLetter.test(value)) 
    {
        document.querySelector(`#${id}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#${id}`).innerHTML = 'Tên phải là dạng chữ'
    return false;
}

function kiemTraDoDai(value, id, maxLenght) {

    if (value.length > maxLenght) {
        document.querySelector(`#${id}`).innerHTML = `Nhập tối đa ${maxLenght} số`
        return false;

    }
    document.querySelector(`#${id}`).innerHTML = '';
    return true;
}

function kiemTraSo(value, id) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(`#${id}`).innerHTML = ''
        return true;
    }
    document.querySelector(`#${id}`).innerHTML = 'Tài khoản là số'
    return false;
}



function kiemTraKhoang(value, id, min, max) {
    if (value < min || value > max) {
        document.querySelector(`#${id}`).innerHTML = `Nhập trong khoảng ${min}- ${max}`
        return false;
    }
    document.querySelector(`#${id}`).innerHTML = '';
    return true;
}



function kiemtraMatKhau(value, id) {
    var regexMatKhau = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if (regexMatKhau.test(value)) {
        document.querySelector(`#${id}`).innerHTML = "";

        return true;
    }
    document.querySelector(`#${id}`).innerHTML = "Mật khẩu từ 6-10 ký tự, có 1 chữ in hoa, 1 ký tự đặc biệt"

}




function kiemTraNgayLam(value, id) {
    var regexDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;

    if (regexDate.test(value)) {
        document.querySelector(`#${id}`).innerHTML = '';
        return true;
    }

    document.querySelector(`#${id}`).innerHTML = 'Vui lòng điền lại ngày làm MM/DD/YYY';
    return false;


}



function kiemTraChucVu (value,id) {
    if(value === 0) {
        document.querySelector(`#${id}`).innerHTML = 'Vui Lòng chọn chức vụ'
        return false
    }

    document.querySelector(`#${id}`).innerHTML = ''
    return true;
}
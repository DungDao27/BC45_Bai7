function NhanVien () {
    this.taiKhoan = '';
    this.hoVaTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.chucVu = '';
    this.LuongCoBan = 0 ;
    this.gioLam = 0;
    this.heSoLuong = 0;
    this.tinhTongLuong = function () {
        var htmloutPut = ''
        if (this.heSoLuong === 0) {
          htmloutPut = 'vui long chon chuc vu'
          return ;
        }
        var tongLuong = this.heSoLuong * this.LuongCoBan
       
        return tongLuong;
    }

   this.xepLoai = function () {
    var htmlOutPut = '';
      if (this.gioLam >= 192) {
        htmlOutPut = 'Nhân viên xuất sắc';
      }else if (this.gioLam < 192 && this.gioLam >= 176) {
        htmlOutPut = 'Nhân Viên Giỏi';
        
      }else if (this.gioLam< 176 && this.gioLam >= 160) {
        htmlOutPut = 'Nhân viên khá'
      }else  {
        htmlOutPut = 'Nhân viên trung bình'
      }
      return htmlOutPut;
   }
   
    
}
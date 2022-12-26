module.exports = {
    show_flash_message: (flash) => {
        let body = `swal({
            title: "${flash.title}",
            text: "${flash.content}",
            icon: "${flash.type}",
            button: "Ok",
        });`
        if (flash.socket) {
            console.log("help-socket")
            body += `emmit_socket_noti("${flash.noti._id}", "${flash.noti.category}");`
        }
        return `<script>
            ${body}
        </script>`
    },
    paging: (notis, cate) => {
        let number_page = notis.length / 10 + 1
        let body = ""
        for (let i = 0; i < number_page; i++) {
            if (cate) {
                body += `<a class="btn btn-sm btn-primary mx-1" href="/student/noti?page=${i}&cate=${cate}">${i}</a>`
            } else {
                body += `<a class="btn btn-sm btn-primary mx-1" href="/student/noti?page=${i}">${i}</a>`
            }
        }
        return body;
    },
    show_nav: (me) => {
        if (me.role == "department") {
            return `<nav class="navbar-expand-lg navbar navbar-default navbar-static-top navbar-light bg-light">
            <button id="openNav" class="w3-button w3-teal w3-xlarge" onclick="w3_open()">&#9776;</button>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Hello
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/login">Đăng xuất</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        VI
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item">EN</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/department/home">Trang chủ <span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </nav>
        <div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="mySidebar">
            <a href="/department/home" class="w3-bar-item w3-button">Trang chủ</a>
            <a href="/department/noti" class="w3-bar-item w3-button">Thông báo</a>
            <a href="#!" class="w3-bar-item w3-button" data-toggle="modal" data-target="#change-pass">Đổi mật
                khẩu</a>
            <button class="w3-bar-item w3-button w3-large" onclick="w3_close()">Close &times;</button>
        </div>
        
        <form action="/account/change-pass" method="post">
            <div class="modal fade" id="change-pass" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Đổi mật khẩu</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label for="" class="mt-2">Mật khẩu cũ</label>
                            <input type="password" name="old_pass" class="form-control" required>
                            <label for="" class="mt-2">Mật khẩu mới</label>
                            <input type="password" name="new_pass" class="form-control" required>
                            <label for="" class="mt-2">Nhập lại mật khẩu mới</label>
                            <input type="password" name="conf_pass" class="form-control" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>`
        } else if (me.role == 'admin') {
            return `<nav class="navbar-expand-lg navbar navbar-default navbar-static-top navbar-light bg-light">
            <button id="openNav" class="w3-button w3-teal w3-xlarge" onclick="w3_open()">&#9776;</button>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Hello
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/login">Đăng xuất</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        VI
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item">EN</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/admin/home">Trang chủ <span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </nav>
        <div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="mySidebar">
            <a href="/admin/home" class="w3-bar-item w3-button">Trang chủ</a>
            <a href="/admin/account" class="w3-bar-item w3-button">Thêm tài khoản</a>
            <a href="#!" class="w3-bar-item w3-button" data-toggle="modal" data-target="#change-pass">Đổi mật
                khẩu</a>
            <button class="w3-bar-item w3-button w3-large" onclick="w3_close()">Close &times;</button>
        </div>
        
        <form action="/account/change-pass" method="post">
            <div class="modal fade" id="change-pass" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Đổi mật khẩu</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label for="" class="mt-2">Mật khẩu cũ</label>
                            <input type="password" name="old_pass" class="form-control" required>
                            <label for="" class="mt-2">Mật khẩu mới</label>
                            <input type="password" name="new_pass" class="form-control" required>
                            <label for="" class="mt-2">Nhập lại mật khẩu mới</label>
                            <input type="password" name="conf_pass" class="form-control" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>`
        } else {
            return `
            <nav class="navbar-expand-lg navbar navbar-default navbar-static-top navbar-light bg-light">
    <button id="openNav" class="w3-button w3-teal w3-xlarge" onclick="w3_open()">&#9776;</button>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Hello
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/login">Đăng xuất</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                VI
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item">EN</a>
        </li>
        <li class="nav-item active">
            <a class="nav-link" href="/student/home">Trang chủ <span class="sr-only">(current)</span></a>
        </li>
    </ul>
</nav>
<div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="mySidebar">
    <a href="/student/home" class="w3-bar-item w3-button">Trang chủ</a>
    <a href="/student/me" class="w3-bar-item w3-button">Trang cá nhân</a>
    <a href="/student/noti" class="w3-bar-item w3-button">Thông báo</a>
    <a href="/student/noti-cate" class="w3-bar-item w3-button">Phân loại thông báo</a>
    <button class="w3-bar-item w3-button w3-large" onclick="w3_close()">Close &times;</button>
</div>`
        }
    }
};

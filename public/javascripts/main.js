var topic = [
    "Phòng Công tác học sinh sinh viên (CTHSSV)",
    "Phòng Đại học",
    "Phòng Sau đại học",
    "Phòng điện toán và máy tính",
    "Phòng khảo thí và kiểm định chất lượng",
    "Phòng tài chính",
    "TDT Creative Language Center",
    "Trung tâm tin học",
    "Trung tâm đào tạo phát triển xã hội (SDTC)",
    "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM)",
    "Trung tâm hợp tác doanh nghiệp và cựu sinh viên",
    "Khoa Luật, Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa",
    "Viện chính sách kinh tế và kinh doanh",
    "Khoa Mỹ thuật công nghiệp",
    "Khoa Điện – Điện tử",
    "Khoa Công nghệ thông tin",
    "Khoa Quản trị kinh doanh",
    "Khoa Môi trường và bảo hộ lao động",
    "Khoa Lao động công đoàn",
    "Khoa Tài chính ngân hàng",
    "Khoa giáo dục quốc tế"
];
function render_categories() {
    let main = document.querySelector('.categories')
    topic.forEach((topic, index) => {
        main.innerHTML += `<div class="form-group">
        <input type="checkbox" value="${index}" id="${index}" name="categories[]">
        <label for="${index}">${topic}</label>
    </div>`;
    })
}
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "20%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}
function view_noti() {
    let views = document.querySelectorAll('.view')
    let view = document.getElementById('view')
    views.forEach(btn => {
        btn.onclick = () => {
            let title = btn.getAttribute("data-title");
            let content = btn.getAttribute("data-content");
            let cate = btn.getAttribute("data-cate");
            let time = btn.getAttribute("data-time");
            view.innerHTML = `<h4> ${title}</h4>
                        <div>${content}</div>
                        <div>${topic[cate] || topic[0]}</div>
                        <div class="text-sm">${time}</div>`;
        }
    })
}

function delete_noti() {
    let dele = document.getElementById('delete')
    let deles = document.querySelectorAll('.dele')
    deles.forEach(btn => {
        btn.onclick = () => {
            let id = btn.getAttribute('data-id');
            dele.href = `/noti/delete/${id}`;
        }
    })
}
function edit_noti() {
    let edits = document.querySelectorAll('.edit')
    let titleEdit = document.getElementById('title_edit')
    let contentEdit = document.getElementById('content_edit')
    let cateEdit = document.getElementById('cate_edit')
    let idEdit = document.getElementById('id_edit')
    edits.forEach(btn => {
        btn.onclick = () => {
            let title = btn.getAttribute('data-title')
            let content = btn.getAttribute('data-content')
            let category = btn.getAttribute('data-cate')
            let id = btn.getAttribute('data-id')
            titleEdit.value = title
            contentEdit.value = content
            cateEdit.value = category
            cateEdit.innerHTML = topic[category]
            idEdit.value = id

        }
    })
}

function create_post() {
    let createPost = document.getElementById('create_post')
    createPost.onsubmit = (e) => {
        e.preventDefault()
        const body = new FormData(e.target)
        if (document.getElementById('img').value) {
            swal({
                title: "Information",
                text: "Post is being processed",
                icon: "success",
                button: "Ok",
            });
        }
        document.getElementById('content').value = null
        document.getElementById('img').value = null
        fetch('/post', { method: 'post', body })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    swal({
                        title: "Success",
                        text: data.msg,
                        icon: "success",
                        button: "Ok",
                    });
                    show_post(data.post)
                }
                else {
                    swal({
                        title: "Error",
                        text: data.msg,
                        icon: "error",
                        button: "Ok",
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })

    }
}
function show_post(post) {
    let main = document.querySelector('#posts')
    main.innerHTML = `<div class="card mt-3" id="p-${post._id}">
                        <div class="d-flex mt-4 mx-4">
                            <div class="head img-sm mr-2">
                                <img src="${post.avatar_user}" class="card-img-top" alt="...">
                            </div>
                            <strong class="f-1">
                            <a href="/account/profile/${post.user_id}">${post.user_name}</a>
                                <br>
                                <p class="text-sm time-create">${moment(post.craetedAt).fromNow()}</p>
                            </strong>
                        <div>
                        <button class="btn btn-sm btn-primary e_post" data-id="${post._id}" data-title="${post.content}" data-ytb="${post.youtube_link}"  data-toggle="modal" data-target="#edit_post_modal">Sửa</button>
                            <button class="btn btn-sm btn-danger de_p"  data-toggle="modal" data-target="#delete_post" data-id="${post._id}">Xóa</button>
                        </div>
                            
                        </div>
                        <div class="card-body post-body">
                            <h5 class="card-title">${post.content}</h5>
                            ${post.image_link &&
        (`<div class="img-around">
                                    <img src="${post.image_link}" alt="">
                                </div>`)}
                            ${post.youtube_link && (
            `<div class="img-around">
                    <iframe width="500" height="315" src="${post.youtube_link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div>`
        )}
                            <button class="btn btn-sm btn-primary mt-3 cmt" data-toggle="modal" data-target="#add_cmt"  data-id="${post._id}">Add a comment</button>
                        </div>
                        <div class="card-body post-body" id="c-${post._id}">
                        </div>
                    </div>
                    ` + main.innerHTML;
}
function get_post() {
    let page = 0;
    load_post(`/post/get_post?page=${page}`)
    page++;
    event_scroll = window.onscroll = (e) => {
        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();
        if (position >= bottom) {
            load_post(`/post/get_post?page=${page}`)
            page++;
        }
    }
}
function get_user() {
    let url = window.location.href;
    let args = url.split('/');
    let user = args[args.length - 1];
    let page = 0;
    load_post(`/post/get_post?page=${page}&user_id=${user}`)
    page++;
    event_scroll = window.onscroll = (e) => {
        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();
        if (position >= bottom) {
            load_post(`/post/get_post?page=${page}&user_id=${user}`)
            page++;
        }
    }
}
function load_post(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => render_post(data))
        .catch(e => console.log(e))
}
function render_post(data) {
    let main = document.querySelector('#posts')
    let { posts, me } = data
    posts.forEach(post => {
        main.innerHTML += `
                    <div class="card mt-3" id="p-${post._id}">
                        <div class="d-flex mt-4 mx-4">
                            <div class="head img-sm mr-2">
                                <img src="${post.avatar_user}" class="card-img-top" alt="...">
                            </div>
                            <strong class="f-1">
                                <a href="/account/profile/${post.user_id}">${post.user_name}</a>
                                <br>
                                <p class="text-sm time-create">${moment(post.createdAt).fromNow()}</p>
                            </strong>
                            ${post.user_id == me ? (`<div>
                            <button class="btn btn-sm btn-primary e_post" data-id="${post._id}" data-title="${post.content}" data-ytb="${post.youtube_link}"  data-toggle="modal" data-target="#edit_post_modal">Sửa</button>

                            <button class="btn btn-sm btn-danger de_p"  data-toggle="modal" data-target="#delete_post" data-id="${post._id}">Xóa</button>
                        </div>`) : ""}
                            
                        </div>
                        <div class="card-body post-body">
                            <h5 class="card-title">${post.content}</h5>
                            ${post.image_link &&
            (`<div class="img-around">
                                    <img src="${post.image_link}" alt="">
                                </div>`)}
                            ${post.youtube_link && (
                `<div class="img-around">
            <iframe width="500" height="315" src="${post.youtube_link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div>`
            )}
                            <button class="btn btn-sm btn-primary mt-3 cmt" data-toggle="modal" data-target="#add_cmt" data-id="${post._id}">Add a comment</button>
                        </div>
                        <div class="card-body post-body" id="c-${post._id}">
                        </div>
                        </div>`;
        let main_cmt = document.querySelector(`#c-${post._id}`);
        post.comments.forEach(cmt => {
            main_cmt.innerHTML += `
                                <div class="d-flex mt-4px-3 py-3" id="c-d-${cmt._id}">
                            <span class="head img-sm mx-4">
                                <img src="${cmt.avatar_user}" class="card-img-top" alt="...">
                            </span>
                            <span class=" ">
                                <div href="#">${cmt.username}</div>
                                <p class="text-sm mb-0">${cmt.content}</p>
                                <p class="text-sm time-create">${moment(cmt.createdAt).fromNow()}</p>
                                ${me == cmt.user_id ? (`<button class="btn btn-sm btn-danger h-2 d_c" data-id="${cmt._id}" data-p-id="${post._id}" data-toggle="modal" data-target="#dele_cmt">Xóa</button>`) : ""}
                            </span>
                        </div>
                        <hr>
                                `
        })
    })
    // if (posts.length < 10) {
    //     // main.innerHTML += `<div class="mt-5">You are read all post</div>`;
    //     window.removeEventListener("scroll", event_scroll)
    // }
}
function delete_post() {
    call_delete_post()
    let dePB = document.getElementById('de_p_b')
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains('de_p')) {
            let id = e.target.getAttribute("data-id")
            dePB.setAttribute("post-id", id)
        }
    })
}
function add_comment() {
    let idPC = document.getElementById('id_p_c')
    call_add_cmt()
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains('cmt')) {
            let id = e.target.getAttribute("data-id")
            idPC.value = id
        }
    })
}
function call_add_cmt() {
    let addCmtF = document.getElementById('f_add_cmt')
    addCmtF.onsubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const body = JSON.stringify({
            content: form.elements.content.value,
            id: form.elements.id.value,
        })
        document.getElementById('c_cmt').value = null
        const headers = { 'Content-Type': 'application/json' }
        fetch("/post/cmt", { method: 'POST', body: body, headers: headers })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    swal({
                        title: "Success",
                        text: "Comment was saved",
                        icon: "success",
                        button: "Ok",
                    });
                    show_cmt(document.getElementById('id_p_c').value, data.cmt)
                }
                else {
                    swal({
                        title: "Error",
                        text: data.msg,
                        icon: "error",
                        button: "Ok",
                    });
                }
            })
            .catch(e => console.error(e))
    }
}
function show_cmt(id, cmt) {
    let main = document.querySelector(`#c-${id}`);
    main.innerHTML = `<div class="d-flex mt-4px-3 py-3" id="c-d-${cmt._id}">
    <span class="head img-sm mx-4">
        <img src="${cmt.avatar_user}" class="card-img-top" alt="...">
    </span>
    <span class="">
        <div href="#">${cmt.username}</div>
        <p class="text-sm mb-0">${cmt.content}</p>
        <p class="text-sm time-create">${moment(cmt.createdAt).fromNow()}</p>
       <button class="btn btn-sm btn-danger h-2 d_c" data-id="${cmt._id}"  data-toggle="modal" data-target="#dele_cmt" data-p-id="${id}">Xóa</button>
    </span>
</div>
<hr>` + main.innerHTML
}
function delete_comment() {
    let btn_dlt_cmt = document.querySelector('.dlt_cmt')

    window.onclick = (e) => {
        if (e.target.closest('.d_c')) {
            let id = e.target.getAttribute("data-id");
            let p_id = e.target.getAttribute("data-p-id")
            btn_dlt_cmt.setAttribute('data-id', id)
            btn_dlt_cmt.setAttribute('data-p-id', p_id)
        }
    }

    let fDCmt = document.getElementById('f_d_cmt')
    btn_dlt_cmt.onclick = (e) => {
        let cmt_id = btn_dlt_cmt.getAttribute('data-id')
        let p_id = btn_dlt_cmt.getAttribute('data-p-id')
        fetch(`/post/d-cmt/${cmt_id}/${p_id}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    swal({
                        title: "Success",
                        text: data.msg,
                        icon: "success",
                        button: "Ok",
                    });
                    document.getElementById(`c-d-${cmt_id}`).remove();
                }
                else {
                    swal({
                        title: "Error",
                        text: data.msg,
                        icon: "error",
                        button: "Ok",
                    });
                }
            })
            .catch(e => console.log(e))
    }
}
function call_delete_post() {
    let dePB = document.getElementById('de_p_b')
    dePB.onclick = (e) => {
        let id = e.target.getAttribute("post-id")
        fetch(`/post/delete/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    swal({
                        title: "Success",
                        text: data.msg,
                        icon: "success",
                        button: "Ok",
                    });
                    delete_post_view(id)
                }
                else {
                    swal({
                        title: "Error",
                        text: data.msg,
                        icon: "error",
                        button: "Ok",
                    });
                }
            })
            .catch(e => console.log(e))
    }

}

function delete_post_view(id) {
    let p = document.getElementById(`p-${id}`);
    p.remove();
}

function edit_post() {
    let contentEdit = document.getElementById('content_edit')
    let ytbEdit = document.getElementById('ytb_edit')
    let pIdE = document.getElementById('p_id_e')
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains('e_post')) {
            let id = e.target.getAttribute("data-id");
            let title = e.target.getAttribute("data-title");
            let ytb = e.target.getAttribute("data-ytb");
            contentEdit.value = title
            ytbEdit.value = ytb;
            pIdE.value = id
        }
    })

    let editPost = document.getElementById('edit_post')
    let btnEdit = document.querySelector('.btn_edit_p')
    btnEdit.onclick = (e) => {
        e.preventDefault();
        const body = new FormData(editPost)
        if (document.getElementById('img_e').value) {
            swal({
                title: "Information",
                text: "Post is being processed",
                icon: "success",
                button: "Ok",
            });
        }
        document.getElementById('content_edit').value = null
        document.getElementById('img_e').value = null
        document.getElementById('ytb_edit').value = null
        fetch('/post/edit', { method: 'post', body })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    swal({
                        title: "Success",
                        text: data.msg,
                        icon: "success",
                        button: "Ok",
                    });
                    change_post_view(data.post, data.me)
                }
                else {
                    swal({
                        title: "Error",
                        text: data.msg,
                        icon: "error",
                        button: "Ok",
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
}
function change_post_view(post, me) {
    let main = document.querySelector(`#p-${post._id}`)

    main.innerHTML = `
                        <div class="d-flex mt-4 mx-4">
                            <div class="head img-sm mr-2">
                                <img src="${post.avatar_user}" class="card-img-top" alt="...">
                            </div>
                            <strong class="f-1">
                            <a href="/student/profile/${post.user_id}">${post.user_name}</a>
                                <br>
                                <p class="text-sm time-create">${moment(post.craetedAt).fromNow()}</p>
                            </strong>
                        <div>
                        <button class="btn btn-sm btn-primary e_post" data-id="${post._id}" data-title="${post.content}" data-ytb="${post.youtube_link}"  data-toggle="modal" data-target="#edit_post_modal">Sửa</button>
                            <button class="btn btn-sm btn-danger de_p"  data-toggle="modal" data-target="#delete_post" data-id="${post._id}">Xóa</button>
                        </div>
                            
                        </div>
                        <div class="card-body post-body">
                            <h5 class="card-title">${post.content}</h5>
                            ${post.image_link &&
        (`<div class="img-around">
                                    <img src="${post.image_link}" alt="">
                                </div>`)}
                            ${post.youtube_link && (
            `<div class="img-around">
                    <iframe width="500" height="315" src="${post.youtube_link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div>`
        )}
                            <button class="btn btn-sm btn-primary mt-3 cmt" data-toggle="modal" data-target="#add_cmt"  data-id="${post._id}">Add a comment</button>
                        </div>
                        <div class="card-body post-body" id="c-${post._id}">
                        </div>
                    `;
    let main_cmt = document.querySelector(`#c-${post._id}`);
    post.comments.forEach(cmt => {
        main_cmt.innerHTML += `
                        <div class="d-flex mt-4px-3 py-3" id="c-d-${cmt._id}">
                    <span class="head img-sm mx-4">
                        <img src="${cmt.avatar_user}" class="card-img-top" alt="...">
                    </span>
                    <span class=" ">
                        <div href="#">${cmt.username}</div>
                        <p class="text-sm mb-0">${cmt.content}</p>
                        <p class="text-sm time-create">${moment(cmt.createdAt).fromNow()}</p>
                        ${me == cmt.user_id ? (`<button class="btn btn-sm btn-danger h-2 d_c" data-id="${cmt._id}" data-p-id="${post._id}" data-toggle="modal" data-target="#dele_cmt">Xóa</button>`) : ""}
                    </span>
                </div>
                <hr>
                        `
    })
}
function show_list_cate_noti() {
    let main = document.querySelector("#cate-list")
    topic.forEach((t, index) => {
        main.innerHTML += `<div class="card card-item" style="width: 18rem;">
        <img src="/images/logo.png" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${t}</p>
            <a href="/student/noti?cate=${index}" class="btn btn-primary">See</a>
        </div>
    </div>`
    })
}
function emmit_socket_noti(id, cate) {
    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    const socket = io(url);
    socket.on("connect", () => {
        socket.send();
    })
    socket.emit("department-post", { id, cate })
}
function on_event() {

    let socketBox = document.getElementById('socket')

    let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    const socket = io(url);
    socket.on("connect", () => {
        socket.send();
    })
    socket.on("department-post-new", data => {
        console.log(data)
        socketBox.innerHTML = `<div class="alert alert-primary" role="alert">
       ${topic[data.cate]} vừa đăng thông báo mới, bấm <a href="/student/noti-detail/${data.id}" /> Vào đây </a> để xem chi tiết
    </div>`
    })
}
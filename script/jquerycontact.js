$('#allcontacts').on('click', function(){
    $('#result').html('')
    $.ajax({
        url: 'http://localhost:3000/contacts',
        type: 'get',
        dataType: 'json',
        data:{
    
        },
        success: function(data){
            $.each(data, function(i,data){
                $('#result').append(`
                <div class="col-md-3">
                    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
                        <div class="card-header">Contact</div>
                        <div class="card-body">
                            <h5 class="card-title"> `+ data.firstName+` `+ data.lastName +`</h5>
                            <button type="button" class="btn btn-success edit" data-toggle="modal" data-target="#staticBackdrop2" data-id="`+ data.id+`">Edit</button>
                            <button type="button" class="btn btn-info detail" data-id="`+ data.id+`" data-toggle="modal" data-target="#exampleModal2">Detail</button>
                            <button type="button" class="btn btn-warning delete" data-id="`+ data.id+`" data-toggle="modal" data-target="#exampleModal">Delete</button>
                        </div>
                    </div>
                </div>
                `)
            })
        }
    })
})


/* search start */
$('#button-addon2').on('click', function(){
    $.ajax({
        url: 'http://localhost:3000/contacts/' + $('#inputcontactid').val(),
        type: 'get',
        dataType:'json',
        data:{

        },
        success: function(data){
            $('#result').html('')
            $('#result').append(`
                <div class="col-md-3">
                    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
                        <div class="card-header">Contact</div>
                        <div class="card-body">
                            <h5 class="card-title"> `+ data.firstName +` `+ data.lastName +`</h5>
                            <button type="button" class="btn btn-success edit" data-toggle="modal" data-target="#staticBackdrop2" data-id="`+ data.id+`">Edit</button>
                            <button type="button" class="btn btn-info detail" data-id="`+ data.id+`" data-toggle="modal" data-target="#exampleModal2">Detail</button>
                            <button type="button" class="btn btn-warning delete" data-id="`+ data.id+`" data-toggle="modal" data-target="#exampleModal">Delete</button>
                        </div>
                    </div>
                </div>
            `)
        }

    })
})
/* search end */



/* edit contact start */
$('#result').on('click', '.edit', function(){
    let editid = $(this).data('id')
    $.ajax({
        url: 'http://localhost:3000/contacts/' +editid,
        type: 'get',
        dataType: 'json',
        data:{

        },
        success: function(data){
            $('#firstname').val(data.firstName)
            $('#lastname').val(data.lastName)
            $('#phone').val(data.phone)
            $('#address').val(data.address)
            $('#company').val(data.company)

            $('#edited').on('click',function(event){
                $.ajax({
                    url: 'http://localhost:3000/contacts/' +editid,
                    type: 'put',
                    dataType: 'json',
                    data:{
                        firstName: $('#firstname').val(),
                        lastName: $('#lastname').val(),
                        phone: $('#phone').val(),
                        address: $('#address').val(),
                        company: $('#company').val()
                    },
                    success: function(){
                        location.reload()
                    }
                    
                })
                event.preventDefault()
            })

        }
    })
})
/* edit contact end */

/* detail contact start */
$('#result').on('click', '.detail',function(){
    let detailid = $(this).data('id')
    $.ajax({
        url: 'http://localhost:3000/contacts/' +detailid,
        type: 'get',
        dataType: 'json',
        data:{

        },
        success: function(data){
            $('#modaldetail').html(`
            First Name : `+ data.firstName+ ` <br>
            <hr>
            Last Name : `+ data.lastName+ ` <br>
            <hr>
            Phone : `+ data.phone+` <br>
            <hr>
            Address: `+ data.address+` <br>
            <hr>
            Company : `+ data.company+`
            `)

        }
    })

})
/* detail contact end */

/* delete contact start*/
$('#result').on('click','.delete', function(){
    let deleteid = $(this).data('id')

    $.ajax({
        url: 'http://localhost:3000/contacts/' +deleteid,
        type: 'delete',
        dataType: 'json',
        data:{

        },
        success: function(data){
            $('.modaldelete').on('click', function(){
                location.reload();
            })
        }
    })
})
/* delete contact end*/

/* form add contact start*/
$('form').submit(function(event){
    $.ajax({
        url: 'http://localhost:3000/contacts',
        type: 'post',
        dataType: 'json',
        data:{
            firstName: $('#addfirstname').val(),
            lastName: $('#addlastname').val(),
            phone: $('#addphone').val(),
            address: $('#addaddress').val(),
            company: $('#addcompany').val()
        },
        success: function(data){
            $('#addfirstname').val('')
            $('#addlastname').val('')
            $('#addphone').val('')
            $('#addaddress').val('')
            $('#addcompany').val('')
            location.reload()
        }
    })
    event.preventDefault()
})

/* form add contact end */




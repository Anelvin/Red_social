$('#btn-like').click(function(e){
    e.preventDefault();
    const imageId = $(this).data('id');
    $.post('/images/'+imageId+'/like')
    .done(data=>{
        $('.likes-count').text(data.likes)
    })
});
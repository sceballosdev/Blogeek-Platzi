$(() => {

    const objAuth = new Autenticacion();

    $("#btnRegistroEmail").click(() => {
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const name = $('#nombreContactoReg').val();

        // TODO : LLamar crear cuenta con email
        const auth = new Autenticacion();
        auth.createAccountEmailPass(email, password, name);
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        // TODO : LLamar auth cuenta con email

        const auth = new Autenticacion();
        auth.authEmailPass(email, password);
    });

    $("#authGoogle").click(() => objAuth.authGoogleAccount());

    $("#authFB").click(() => objAuth.authFacebookAccount());

    //$("#authTwitter").click(() => //AUTH con Twitter);

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

});

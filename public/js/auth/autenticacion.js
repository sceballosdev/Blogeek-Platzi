class Autenticacion {
    authEmailPass(email, password) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    $('#avatar').attr('src', 'imagenes/usuario_auth.png');
                    Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000);
                } else {
                    firebase.auth().signOut();
                    Materialize.toast(
                        `Por favor realiza la verificación de la cuenta ${result.user.email}`,
                        5000
                    );
                }

                $('.modal').modal('close');

            }).catch(error => {
            Materialize.toast(
                `Problemas con el inicio de sesión ${error}`,
                5000
            );
        });
    }

    createAccountEmailPass(email, password, name) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
                result.user.updateProfile({
                    displayName: name
                });

                const configEmail = {
                    url: 'http://localhost:3000/'
                };

                result.user.sendEmailVerification(configEmail).catch(error => {
                    console.log('error ' + error);
                    Materialize.toast(error.message, 4000);
                });

                firebase.auth().signOut();

                Materialize.toast(
                    `Bienvenido ${name}, debes realizar el proceso de verificación`,
                    4000
                );

                $('.modal').modal('close');

            })
            .catch(error => {
                console.log('error ' + error);
                Materialize.toast(error.message, 4000);
            });
    }

    authGoogleAccount() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.signInFirebaseProvider(provider);
    }

    authFacebookAccount() {
        const provider = new firebase.auth.FacebookAuthProvider();
        this.signInFirebaseProvider(provider);
    }

    authTwitterAccount() {
        const provider = new firebase.auth.TwitterAuthProvider();
        this.signInFirebaseProvider(provider);
    }

    signInFirebaseProvider(provider) {
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                $('#avatar').attr('src', result.user.photoURL);
                $('.modal').modal('close');
                Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
            }).catch(err => {
            console.error('error ' + err);
            Materialize.toast(`Hubo problemas iniciando sesión ${err} !! `, 4000);
        });
    }
}

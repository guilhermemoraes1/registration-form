class Validator {

    constructor() {
        this.validations = [
            "data-required", "data-min-length", "data-max-length", "data-email-validate", "data-only-letters", "data-equal", "data-password-validate"
        ]
    };

    // inicia a validação de todos os campos
    validate(form) {

        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // pega os inputs
        let inputs = form.getElementsByTagName("input");

        // transforma HTMLCollection -> Array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){

            // loop em todas as validações existentes
            for(let i =0; this.validations.length > i; i++){

                // verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {

                    // limpando a string pra virar um método
                    // data-min-length -> minlength
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //chamar o método
                    this[method](input, value);
                }
            }
        }, this);
    };

    // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres.`;
        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    };

    // verifica o número máximo de caracteres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo só pode ter no máximo ${maxValue} caracteres.`;
        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    };

    // valida emails
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let inputValue = input.value;

        let errorMessage = `Por favor, insira um email válido, como por exemplo: julia234@gmail.com`;

        if (!re.test(inputValue)) {
            
            this.printMessage(input, errorMessage);
        }
    };

    // valida se o campo tem apenas letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais.`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    };

    // verifica se o input é requirido
    required(input) {
        let inputValue = input.value;
        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório.`;
            this.printMessage(input, errorMessage);
        }
    };

    // verifica se dois campos são iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    };

    // valida o campo de senha
    passwordvalidate(input) {

        // transforma string em um array
        let charArr = input.value.split("");

        let uppercase = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercase++;
            } else if (!isNaN(parseInt(charArr[i]))){
                numbers++;
            }
        };

        if (uppercase == 0 || numbers == 0) {
            let errorMessage = `A senha precisa de um caractere maiúsculo e um número.`;
            this.printMessage(input, errorMessage);
        }
    };

    // método para imprimir mensagens de erro na tela
    printMessage(input, msg) {

        // quantidade de erros
        let errosrQty = input.parentNode.querySelector('.error-validation');

        if (errosrQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove("template");
            inputParent.appendChild(template);
        }
    };

    // limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    };
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener("click", function(e) {

    e.preventDefault();

    validator.validate(form);
});
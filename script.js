class Validator {

    constructor() {
        this.validations = [
            "data-min-length", 
        ]
    }

    // inicia a validação de todos os campos
    validate(form) {

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
        
    }

    // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres.`;
        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    };

    // método para imprimir mensagens de erro na tela
    printMessage(input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove("template");
        inputParent.appendChild(template);
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener("click", function(e) {

    e.preventDefault();

    validator.validate(form);
});
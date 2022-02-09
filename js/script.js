// Arrays com as perguntas ja cadastradas e respostas
var perguntas = []
var respostas = []
carregar()

var i = 0
var msgS = ''

// Aqui eu crio um evento que será acionado sempre que eu digitar enter
document.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        // Busco o campo de texto do chat pelo ID  
        var input = document.getElementById('txt')

        // Pego o texto dele
        var mensagem = input.value

        // Crio um parágrafo, que será ultilizado posteriormente como balão do bate papo
        var msgC = document.createElement('p')

        // Crio um texto e insiro ele no parágrafo
        var _label = document.createTextNode(mensagem)
        msgC.appendChild(_label)

        // Aqui começam as verificações
        var pos = perguntas.indexOf(mensagem) 
        if(ver(input.value)){

            // Se estiver vazio, adicione uma animação ao input
            input.style = "animation: treme 0.1s; animation-iteration-count: 4;"
        }else{

            // Se a posição retornada não for -1 e o contador i for 0, então significa que o bot já sabe a resposta
            if(pos != -1 && i == 0){
                // Se sim, o texto será a resposta do bot
                _label = document.createTextNode(respostas[pos])

            // Se for -1, então verifique se o contador i é igual a 0
            }else if(i == 0){
                // Se for, o texto será a seguinte mensagem e depois salve a mensagem que o usuario enviou para cadastrar no array
                _label = document.createTextNode('Não conheço esse termo, oque eu devo responder quando você falar isso?')
                msgS = mensagem
                // Seto o contador i em 1, para que o bot entenda que a proxima mensagem será respondendo a sua pergunta 
                i = 1
            
            // Se o contador i for 1
            }else if(i == 1){
                // Se for, ele dirá ao usuario que anotou sua resposta, e logo em seguida armazenará nos arrays os valores
                _label = document.createTextNode('blz fera, vou anotar aqui!')
                // Adiciona os elementos no array
                respostas.push(mensagem)
                perguntas.push(msgS)
                salvar()
                // Reseta o contador i
                i = 0
            }
            
            // Crio uma div para a servir de balão para a resposta do bot
            var newDiv = document.createElement('div')
            newDiv.appendChild(_label)
            
            // Pega o bolo que ficará com os balões(Área do dialogo com o bot)
            var _main = document.getElementById('bloco')
            
            // Insere os balões de fala de cada um
            window.document.getElementById('a-txt').insertBefore(msgC, _main)
            window.document.getElementById('a-txt').insertBefore(newDiv, _main)
            
            // Adiciona uma barra de rolagem caso a conversa se extenda
            window.document.getElementById('a-txt').scrollTo(0, document.getElementById('a-txt').scrollHeight)

            // Zera a animação do input para que possa se repetir
            input.style = "animation: none;"
        }

        // Zera o valor dentro do input após o envio da mensagem
        document.getElementById('txt').value = ''
    }
})

// Verifica se o campo de texto não está vazio
function ver(str){
    var j = Number(0)
    while(j < String(str).length){
        if(String(str).charAt(j) != " "){
            return false
        }
        j+=1
    }
    return true
}

function salvar(){
    localStorage.setItem('perguntas', JSON.stringify(perguntas));
    localStorage.setItem('respostas', JSON.stringify(respostas));
}

function carregar(){
    perguntas = JSON.parse(localStorage.getItem('perguntas')) || []
    respostas = JSON.parse(localStorage.getItem('respostas')) || []
}
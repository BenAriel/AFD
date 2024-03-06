import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class AFD {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("esse automato considera que o estado inicial é o primeiro estado informado");

        // Solicita e lê o número de estados
        System.out.print("Informe o número de estados: ");
        int numEstados = scanner.nextInt();
        String[] estados = new String[numEstados];

        // Solicita e lê os estados
        System.out.println("Informe os estados:");
        for (int i = 0; i < numEstados; i++) {
            estados[i] = scanner.next();
        }

        // Solicita e lê o alfabeto
        System.out.println("Informe o alfabeto(s para sair):");
        String[] alfabeto = new String[2];
        for (int j = 0; j < 2; j++) {
            String letra = scanner.next();
            if (letra.equals("s")) {
                break;
            }
            else {
                alfabeto[j] = letra;
            }
        }
        System.out.println("digite o estado inial:");
        String estadoinicial = scanner.next(); //estado incial
        for(int i = 0; i<estados.length;i++)
        {
            if(estadoinicial.equals(estados[i]))
            {
                break;
            }
            else if(i==estados.length-1)
            {
                System.out.println("estado inicial não encontrado");
                return;
            }
        }
        // Solicita e lê o estado final
        System.out.print("Informe o(s) estado(s) final(is): ");
        List<String> estadoFinal  = new ArrayList<>();
        String finais = scanner.next();
        while(!finais.equals("s"))
        {
            estadoFinal.add(finais);
            finais = scanner.next();
        }
        

        // Inicializa a matriz de transição
        String[][] matrizTransicao = new String[numEstados][alfabeto.length];
        for (int i = 0; i < numEstados; i++) {
            for (int j = 0; j < alfabeto.length; j++) {
                System.out.print("quando " + estados[i] + " ler " + alfabeto[j] + " vai para: ");
                matrizTransicao[i][j] = scanner.next();
            }
        }

        String resposta = "";
        do {
            List<String> sequenciaEstados = new ArrayList<>();
            String estadoAtual = estadoinicial;
            // Solicita e lê a sequência de chaves
            System.out.print("Informe a string da cadeia : ");
            String stringCadeia = scanner.next();

            // Itera sobre cada caractere da sequência
            for (char caractere : stringCadeia.toCharArray()) {
                estadoAtual = transitarEstado(estadoAtual, caractere, estados, alfabeto, matrizTransicao);
                sequenciaEstados.add(estadoAtual);
                if(estadoAtual.equals("morto"))
                {
                    System.out.println("caiu em estado morto");
                    break;
                }
            }
            String resultado = "não aceita";
            for(int i =0; i<estadoFinal.size();i++)
            {
                String verificar = estadoFinal.get(i);
                if (estadoAtual.equals(verificar)) {
                    resultado="aceita";
                    break;
               } 
            }

            System.out.println(resultado);

            System.out.println("Deseja continuar? (s/qualquer coisa)");
            resposta = scanner.next();
        } while (resposta.equals("s"));
    }

    // Função para realizar a transição de estados
    private static String transitarEstado(String estadoAtual, char chave, String[] estados, String[] alfabeto, String[][] matrizTransicao) {
        // Encontra o índice do estado atual e da chave
        int indiceEstadoAtual = -1;
        int indiceChave = -1;
        for (int i = 0; i < estados.length; i++) {
            if (estados[i].equals(estadoAtual)) {
                indiceEstadoAtual = i;
                break;
            }
        }
        for (int j = 0; j < alfabeto.length; j++) {
            if (alfabeto[j].charAt(0) == chave) {
                indiceChave = j;
                break;
            }
        }

        // Retorna o próximo estado com base na transição
        return matrizTransicao[indiceEstadoAtual][indiceChave];
    }
}
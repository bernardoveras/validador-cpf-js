// 705.484.450-52 | 070.987.720-03
// Expressão para somente números: /\D+/g

class CPFValidator {
  constructor(cpf) {
    Object.defineProperty(this, 'cpfLimpo', {
      enumerable: true,
      writable: false,
      configurable: false,
      value: cpf.replace(/\D+/g, '')
    });
  }

  _ehSequencia() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  _gerarNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = CPFValidator._gerarDigito(cpfSemDigitos);
    const digito2 = CPFValidator._gerarDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  static _gerarDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for(let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : '0';
  }

  validar() {
    if(!this.cpfLimpo) return false;
    if(typeof this.cpfLimpo !== 'string') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this._ehSequencia()) return false;
    this._gerarNovoCpf();

    return this.novoCPF === this.cpfLimpo;
  }
}

let validacpf = new CPFValidator('070.987.720-03'); // válido
// validacpf = new CPFValidator('999.999.999-99'); // inválido

if (validacpf.validar()) {
  console.log('CPF válido');
} else {
  console.log('CPF inválido');
}

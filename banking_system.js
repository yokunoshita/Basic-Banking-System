class BankAccount {
    constructor(saldoAwal = 0) {
        this.saldo = saldoAwal;
        this.updateSaldo();
    }

    deposit(total) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (total > 0) {
                    this.saldo += total;
                    this.updateSaldo();
                    resolve(`Deposit sebesar Rp.${total} berhasil. Saldo baru: Rp.${this.saldo}`);
                } else {
                    reject("Jumlah deposit harus lebih besar dari nol.");
                }
            }, 3000);
        });
    }

    withdraw(total) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (total <= this.saldo) {
                    this.saldo -= total;
                    this.updateSaldo();
                    resolve(`Penarikan sebesar Rp.${total} berhasil. Saldo baru: Rp.${this.saldo}`);
                } else {
                    reject("Saldo tidak mencukupi untuk penarikan, coba periksa kembali saldo anda !");
                }
            }, 3000);
        });
    }

    updateSaldo() {
        const balanceElement = document.getElementById('jumlahSaldo');
        balanceElement.textContent = `Rp.${this.saldo}`;
    }
}


const account = new BankAccount();

document.getElementById('depositBtn').addEventListener('click', async function() {
    const jumlahDepo = parseFloat(document.getElementById('jumlahDepo').value);
    if (!isNaN(jumlahDepo) && jumlahDepo > 0) {
        try {
            const message = await account.deposit(jumlahDepo);
            alert(message);
        } catch (error) {
            alert(`Deposit gagal :  ${error}`);
        }
    } else {
        alert("Masukkan jumlah deposit yang valid");
    }
});


document.getElementById('withdrawBtn').addEventListener('click', async function() {
    const jumlahTarik = parseFloat(document.getElementById('jumlahTarik').value);
    if (!isNaN(jumlahTarik) && jumlahTarik > 0) {
        try {
            const message = await account.withdraw(jumlahTarik);
            alert(message);
        } catch (error) {
            alert(`Penarikan gagal :  ${error}`);
        }
    } else {
        alert("Masukkan jumlah penarikan yang valid");
    }
});


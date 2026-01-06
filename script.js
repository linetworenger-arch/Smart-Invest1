// เมนู
function toggleDropdown(button) {
            document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== button.parentElement) d.classList.remove('show');
    });
     button.parentElement.classList.toggle('show');
  }
   window.onclick = function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
    }
  };
//   คำนวนดอกเบี้ย
function calculate() {
    const p = parseFloat(document.getElementById('principal').value);
    const r = parseFloat(document.getElementById('rate').value);
    const y = parseFloat(document.getElementById('years').value);
     
if (!p || !r || !y) {
    document.getElementById('result').innerText = "⚠️ กรุณากรอกข้อมูลให้ครบ";
    return;
}

    const interest = p * (r / 100) * y;
    const total = p + interest;
      
document.getElementById('result').innerHTML = `
    ดอกเบี้ยรวม: ${interest.toFixed(2)} บาท<br>
    ยอดรวมปลายงวด: ${total.toFixed(2)} บาท
    `;
}

// คำนวนภาษี

function calculateTax() {
        const incomeInput = document.getElementById('income');
        const annualIncome = parseFloat(incomeInput.value);
        const resultDisplay = document.getElementById('taxResult');
        resultDisplay.classList.remove('result-success', 'result-error');

if (isNaN(annualIncome) || annualIncome < 0) {
        resultDisplay.innerHTML = '⚠️ กรุณาใส่ตัวเลขรายได้ที่ถูกต้อง';
         resultDisplay.classList.add('result-error'); 
            return;
}
        let totalTax = 0;
        let taxableAmount = annualIncome;

        const brackets = [
            { limit: 500000, rate: 0.15 },
            { limit: 300000, rate: 0.10 },
            { limit: 150000, rate: 0.05 },
            { limit: 0, rate: 0.00 } 
];

for (let i = 0; i < brackets.length; i++) {
    const currentLimit = brackets[i].limit;
    const rate = brackets[i].rate;
            
    const amountInBracket = Math.max(0, taxableAmount - currentLimit);
    const taxInBracket = amountInBracket * rate;
            
    totalTax += taxInBracket;
            
    taxableAmount = Math.min(taxableAmount, currentLimit);
            
    if (taxableAmount <= 0) break;
}
resultDisplay.innerHTML = `ภาษีที่ต้องชำระ: **${totalTax.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** บาท`;
resultDisplay.classList.add('result-success');
}
document.getElementById('generateBtn').addEventListener('click', function () {
  const useName = document.getElementById('useName').checked;
  const useSymbols = document.getElementById('useSymbols').checked;
  const useNumbers = document.getElementById('useNumbers').checked;

  const name = useName ? document.getElementById('name').value : '';
  const symbols = useSymbols ? document.getElementById('symbols').value : '';
  const numbers = useNumbers ? document.getElementById('numbers').value : '';
  const amount = document.getElementById('amount').value;

  if ((useName && name) || (useSymbols && symbols) || (useNumbers && numbers)) {
    const passwords = generatePasswords(name, symbols, numbers, amount);
    document.getElementById('generatedPasswords').innerText = passwords.join('\n');
    document.getElementById('downloadBtn').style.display = 'inline-block';
    document.getElementById('copyBtn').style.display = 'inline-block';
  } else {
    alert('Please enable at least one option and fill in the corresponding fields.');
  }
});

document.getElementById('resetBtn').addEventListener('click', function () {
  document.getElementById('passwordForm').reset();
  document.getElementById('generatedPasswords').innerText = '';
  document.getElementById('downloadBtn').style.display = 'none';
  document.getElementById('copyBtn').style.display = 'none';
});

document.getElementById('downloadBtn').addEventListener('click', function () {
  const passwords = document.getElementById('generatedPasswords').innerText;
  const blob = new Blob([passwords], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'passwords.txt';
  link.click();
});

document.getElementById('copyBtn').addEventListener('click', function () {
  const passwords = document.getElementById('generatedPasswords').innerText;
  navigator.clipboard.writeText(passwords)
    .then(() => alert('Passwords copied to clipboard!'))
    .catch(err => alert('Failed to copy: ' + err));
});

function generatePasswords(name, symbols, numbers, amount) {
  const passwords = [];
  for (let i = 0; i < amount; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const password = `${name}${symbols}${numbers}${randomNum}`;
    passwords.push(password.trim());
  }
  return passwords;
}

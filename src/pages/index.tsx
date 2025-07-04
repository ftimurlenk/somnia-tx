import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useAccount, useConfig } from 'wagmi';
import { type Address } from 'viem';
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { aktiviteKontratiABI } from '../lib/kontratABI';

// --- DEĞİŞİKLİK 1: Sabit kontrat listesini buraya ekliyoruz ---
// Lütfen '0x...' ile başlayan örnek adresleri kendi deploy ettiğiniz kontrat adresleriyle değiştirin.
const sabitKontratListesi: Address[] = [
'0xE1372e482Cdfe9C794a8b30953bBf663356d1765',
'0xb600777f08a5453cFa525Dd8acF5e7fC5E4b7954',
'0x0308F89a1A06A182FD6ceE350451aC69024F7387',
'0x587d012cd49d0039b8DF755Db348068a4a37a0dc',
'0x52f80503Ec758335fDfa2E55461ddB80d20F8653',
'0x8409c2988DE1d1FF610d784B51b9663e909F43C4',
'0xDC0D76B7D6364E6735B75723d000Cb9c25694e84',
'0xd395355Cd570c3AF93418315F9830BBCDFEc272b',
'0x5eD1315A692c84132d8B76405339F5878B2E1B80',
'0xc10424544DBdb2221100Ef2cCb72C9a44c8364E8',
'0x7c7CeCb2DF380fFBeFe869537D70bd16bb311351',
'0x0cEa8025933c0F8c44f8a0176Db60718Dc3394aE',
'0x5A79bC91141C32A9b578604BEEe9534FBD07A826',
'0x77fe393d84380a8b50F435A351d9e85545889c55',
'0x0f80f3B4a7Ab4C6EbAb3e4f28e36f238022B2e9b',
'0xB9ccBcc1615248Bc6527413AFf344dF724485532',
'0x4900135A0d86886e06a41CAa28A716c82fA95F6e',
'0x8cec46D9427df323aB283Cc6B5a2a40Ac931a826',
'0x09C4c81C669B2135E8f1EFA3668440BD2015E29D',
'0x19Ced138AAF1e65FA88920B517d8fc26fe406021',
'0x86d48fa6339872C15d2addDd2A0b24471951793F',
'0xd04349137636e063f1744c172DC068253070FEA5',
'0x951b485ED83397C7214AA9aBE6C63b99841379aC',
'0xB2d2B9b952396E8Bce658b0dd0aeDdAcE0F7513C',
'0x1AFEdcD9eA2C9Df234c4fC16810D7E5b5d80d19B',
'0xC4E137857D3cdE66327b4d15671A8955B7D93BD7',
'0xB70d9312f3e55460327A47C7A9E5A1Eb2a7168Ec',
'0xcE5e12CEeE5898E1b0eB5139Bf3Aeeb389605C36',
'0x17A89b31FD2734828eceB48F364dA5fb662C13CB',
'0x9Fdf1cf34f2E8f2ac6341207023A0Ed11470aC05',
];


export default function Home() {
  const { isConnected } = useAccount();
  const config = useConfig();

  // --- DEĞİŞİKLİK 2: Textarea için olan state'i siliyoruz ---
  // const [contractAddresses, setContractAddresses] = useState(''); 
  const [logs, setLogs] = useState<string[]>([]);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleSequentialInteraction = async () => {
    // --- DEĞİŞİKLİK 3: Adresleri artık state'ten değil, yukarıda tanımladığımız sabit listeden alıyoruz ---
    const addresses = sabitKontratListesi;
    
    if (addresses.length === 0 || !addresses[0].startsWith('0x')) {
      setLogs(['Lütfen kod içerisindeki `sabitKontratListesi` dizisini geçerli adreslerle güncelleyin.']);
      return;
    }

    setIsInteracting(true);
    setLogs([`Döngü başlatılıyor: ${addresses.length} sabit kontrat ile etkileşime girilecek...`]);

    for (let i = 0; i < addresses.length; i++) {
      const targetAddress = addresses[i];
      const logPrefix = `[${i + 1}/${addresses.length}] ${targetAddress.substring(0, 8)}...:`;

      try {
        setLogs(prev => [...prev, `${logPrefix} İşlem cüzdana gönderiliyor...`]);

        const hash = await writeContract(config, {
          address: targetAddress,
          abi: aktiviteKontratiABI,
          functionName: 'sayaciArtir',
        });

        setLogs(prev => [...prev, `${logPrefix} İşlem gönderildi, hash: ${hash.substring(0, 12)}... Onay bekleniyor.`]);
        
        const receipt = await waitForTransactionReceipt(config, { hash });

        const explorerUrl = `https://shannon-explorer.somnia.network/tx/${receipt.transactionHash}`;
        setLogs(prev => [...prev, `${logPrefix} ✔ BAŞARILI! Explorer: <a href="${explorerUrl}" target="_blank" style="color: #64ffda;">${receipt.transactionHash.substring(0, 12)}...</a>`]);

        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err: any) {
        setLogs(prev => [...prev, `${logPrefix} ❌ HATA: ${err.shortMessage || err.message}`]);
        continue;
      }
    }

    setLogs(prev => [...prev, '✨ Tüm işlemler tamamlandı!']);
    setIsInteracting(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #444', paddingBottom: '1rem', width: '100%', textAlign: 'center' }}>
        <ConnectButton />
      </header>

      {isConnected && (
        <main style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2>Somnia Kontrat Etkileşim Aracı</h2>
          
          {/* --- DEĞİŞİKLİK 4: Textarea ve ilgili açıklama metnini siliyoruz --- */}
          <p style={{ color: '#aaa' }}>
            Aşağıdaki butona tıkladığınızda, kod içine gömülü olan kontrat listesiyle sırayla etkileşime girilecektir.
          </p>
          
          <button
            onClick={handleSequentialInteraction}
            disabled={isInteracting}
            style={{ padding: '12px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: isInteracting ? '#555' : '#646cff', color: 'white' }}
          >
            {isInteracting ? 'İşlemler Sürüyor...' : `${sabitKontratListesi.length} Kontratla Etkileşimi Başlat`}
          </button>

          <div style={{
            width: '100%', marginTop: '1rem', padding: '1rem', backgroundColor: '#1a1a1a',
            border: '1px solid #444', borderRadius: '8px', minHeight: '200px',
            fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', textAlign: 'left'
          }}>
            <strong style={{ color: '#fff' }}>İşlem Günlüğü:</strong>
            <div dangerouslySetInnerHTML={{ __html: logs.join('<br />') }} style={{ color: '#ccc', marginTop: '10px' }} />
          </div>
        </main>
      )}
    </div>
  );
}

/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    setIsOpen(false);
    router.push(`/?username=${name}`);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return <button onClick={handleOpen}>Enter your name</button>;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Enter your name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

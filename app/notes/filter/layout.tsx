import React from 'react';
import css from '@/app/notes/NotesPage.module.css'; 

export default function Layout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={css.app}>
      <div style={{ display: 'flex', gap: '24px', marginTop: '20px' }}>
        <aside style={{ width: '250px', flexShrink: 0 }}>{sidebar}</aside>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      {modal}
    </div>
  );
}
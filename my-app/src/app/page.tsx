"use client";
import CurrencyConverter from '../components/CurrencyConverter';
import NavigationBar from '@/components/NavigationBar';
import './page.css';
import './app.css';


export default function Home() {
  return (
    <div className='pageContainer'>
      <div className='appContainer'>
        <NavigationBar />
        <CurrencyConverter/>  
      </div>
    </div>
  );
} ;


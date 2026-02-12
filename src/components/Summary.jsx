import React, { useMemo, useEffect, useState } from 'react';
import { PieChart, ArrowRight, TrendingDown, TrendingUp, Wallet, Users, CheckCircle2 } from 'lucide-react';
import { calculateSummary } from '../utils/splitLogic';

const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
        const duration = 500;
        const steps = 20;
        const increment = value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);
        
        return () => clearInterval(timer);
    }, [value]);
    
    return (
        <span className="number-animate">
            {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
    );
};

const Summary = ({ members, expenses }) => {
    const calculations = useMemo(() =>
        calculateSummary(members, expenses),
        [members, expenses]
    );

    if (!calculations || members.length === 0) return null;

    const { total, perPerson, balances, settlements } = calculations;

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 overflow-hidden card-hover">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>
                
                <div className="relative">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-white/20 backdrop-blur p-2 rounded-xl">
                            <PieChart size={18} />
                        </div>
                        <h2 className="font-bold uppercase tracking-wider text-sm text-white/90">Settlement Summary</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-2 text-blue-100 text-xs mb-2">
                                <Wallet size={14} />
                                <span>Total Expense</span>
                            </div>
                            <p className="text-3xl sm:text-4xl font-bold animate-count-up">
                                ₹<AnimatedNumber value={total} />
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-2 text-blue-100 text-xs mb-2">
                                <Users size={14} />
                                <span>Per Person</span>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold">
                                ₹<AnimatedNumber value={Math.round(perPerson)} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
                {/* Balances Section */}
                <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
                        Individual Balances
                    </h3>
                    <div className="space-y-3">
                        {members.map((member, index) => {
                            const balance = balances[member] || 0;
                            const isPositive = balance >= 0;
                            const absBalance = Math.abs(balance);
                            const maxBalance = Math.max(...Object.values(balances).map(Math.abs));
                            const percentage = maxBalance > 0 ? (absBalance / maxBalance) * 100 : 0;
                            
                            return (
                                <div 
                                    key={member} 
                                    className="group p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-gray-100 transition-all duration-200 animate-slide-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                                                isPositive 
                                                    ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600' 
                                                    : 'bg-gradient-to-br from-red-100 to-red-50 text-red-600'
                                            }`}>
                                                {member.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-800">{member}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold text-lg ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                                                {isPositive ? '+' : '−'}₹{absBalance.toFixed(0)}
                                            </span>
                                            {isPositive ? (
                                                <TrendingUp size={18} className="text-emerald-500" />
                                            ) : (
                                                <TrendingDown size={18} className="text-red-400" />
                                            )}
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                isPositive 
                                                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                                                    : 'bg-gradient-to-r from-red-400 to-red-500'
                                            }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Settlements Section */}
                <section>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-gradient-to-r from-violet-500 to-transparent rounded-full"></span>
                        How to Settle
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4 sm:p-5 space-y-3">
                        {settlements.length > 0 ? (
                            settlements.map((s, idx) => (
                                <div 
                                    key={`${s.from}-${s.to}-${idx}`} 
                                    className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 animate-slide-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex-1 flex items-center gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-red-600 font-bold text-xs flex-shrink-0">
                                                {s.from.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-red-600 truncate">{s.from}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-1 px-2 flex-shrink-0">
                                            <div className="w-6 h-[2px] bg-gradient-to-r from-gray-300 to-gray-200 rounded-full"></div>
                                            <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-2 py-1 rounded-full border border-gray-200">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">pays</span>
                                            </div>
                                            <ArrowRight size={14} className="text-gray-400" />
                                        </div>
                                        
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs flex-shrink-0">
                                                {s.to.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-emerald-600 truncate">{s.to}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-xl text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex-shrink-0">
                                        ₹{s.amount.toFixed(0)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                                    <CheckCircle2 size={32} className="text-emerald-500" />
                                </div>
                                <p className="font-semibold text-gray-700">All Settled Up!</p>
                                <p className="text-sm text-gray-400 mt-1">Everyone is even</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Summary;

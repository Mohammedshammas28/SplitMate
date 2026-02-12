import React, { useMemo } from 'react';
import { PieChart, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { calculateSummary } from '../utils/splitLogic';

const Summary = ({ members, expenses }) => {
    // Use useMemo to prevent unnecessary recalculations on every render
    const calculations = useMemo(() =>
        calculateSummary(members, expenses),
        [members, expenses]
    );

    if (!calculations || members.length === 0) return null;

    const { total, perPerson, balances, settlements } = calculations;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-blue-50 overflow-hidden mb-8">
            <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center gap-2 mb-4 opacity-80">
                    <PieChart size={20} />
                    <h2 className="font-semibold uppercase tracking-wider text-sm">Settlement Summary</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-blue-100 text-xs mb-1">Total Group Expense</p>
                        <p className="text-3xl font-bold">₹{total.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-100 text-xs mb-1">Per Person Split</p>
                        <p className="text-xl font-semibold">₹{perPerson.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <section className="mb-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Detailed Balances</h3>
                    <div className="space-y-3">
                        {members.map(member => {
                            const balance = balances[member] || 0;
                            const isPositive = balance >= 0;
                            return (
                                <div key={member} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <span className="font-medium text-gray-700">{member}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                                            {isPositive ? '+' : ''}₹{Math.abs(balance).toFixed(0)}
                                        </span>
                                        {isPositive ? (
                                            <TrendingUp size={16} className="text-green-500" />
                                        ) : (
                                            <TrendingDown size={16} className="text-red-400" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">How to settle</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        {settlements.length > 0 ? (
                            settlements.map((s, idx) => (
                                <div key={`${s.from}-${s.to}-${idx}`} className="flex items-center gap-3 text-gray-700">
                                    <div className="w-1/3 text-right font-semibold text-red-500 truncate">{s.from}</div>
                                    <div className="flex-1 flex items-center justify-center text-gray-300">
                                        <span className="bg-white px-2 py-0.5 rounded-full border border-gray-100 text-[10px] font-bold text-gray-400">OWES</span>
                                        <div className="h-[1px] bg-gray-200 flex-1 mx-1"></div>
                                        <ArrowRight size={14} className="text-gray-400" />
                                    </div>
                                    <div className="w-1/3 font-semibold text-green-600 truncate">{s.to}</div>
                                    <div className="bg-white px-3 py-1 rounded-lg border border-gray-200 font-bold text-sm whitespace-nowrap">
                                        ₹{s.amount.toFixed(0)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-2 italic text-sm">Everyone is settled up!</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Summary;

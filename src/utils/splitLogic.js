/**
 * SplitMate Logic - pure functions for bill splitting calculations.
 */

export const calculateSummary = (members, expenses) => {
    if (!members || members.length === 0) return null;

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const perPerson = total / members.length;

    // 1. Calculate net balance for each person
    // positive = paid more than share, negative = owes money
    const balances = {};
    members.forEach(member => {
        balances[member] = -perPerson;
    });

    expenses.forEach(exp => {
        if (balances.hasOwnProperty(exp.paidBy)) {
            balances[exp.paidBy] += exp.amount;
        }
    });

    // 2. Identify Debtors and Creditors
    const debtors = []; // [{name, amount}]
    const creditors = [];

    Object.entries(balances).forEach(([name, balance]) => {
        if (balance < -0.01) {
            debtors.push({ name, amount: Math.abs(balance) });
        } else if (balance > 0.01) {
            creditors.push({ name, amount: balance });
        }
    });

    // Sort by amount descending to optimize matching
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    // 3. Compute Settlements (Greedy Algorithm)
    const settlements = [];
    let d = 0;
    let c = 0;

    while (d < debtors.length && c < creditors.length) {
        const debtor = debtors[d];
        const creditor = creditors[c];

        const settlementAmount = Math.min(debtor.amount, creditor.amount);

        if (settlementAmount > 0.01) {
            settlements.push({
                from: debtor.name,
                to: creditor.name,
                amount: settlementAmount
            });
        }

        debtor.amount -= settlementAmount;
        creditor.amount -= settlementAmount;

        if (debtor.amount < 0.01) d++;
        if (creditor.amount < 0.01) c++;
    }

    return { total, perPerson, balances, settlements };
};

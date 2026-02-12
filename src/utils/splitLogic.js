/**
 * SplitMate Logic - pure functions for bill splitting calculations.
 * Supports both equal and custom split modes.
 */

export const calculateSummary = (members, expenses) => {
    if (!members || members.length === 0) return null;

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const perPerson = total / members.length;

    // 1. Calculate net balance for each person
    // For each expense:
    //   - If equal split: divide amount equally among all members
    //   - If custom split: use the customSplits object for each member's share
    // positive balance = paid more than owed, negative = owes money
    const balances = {};
    members.forEach(member => {
        balances[member] = 0;
    });

    expenses.forEach(exp => {
        // Credit the payer with the full amount
        if (balances.hasOwnProperty(exp.paidBy)) {
            balances[exp.paidBy] += exp.amount;
        }

        // Debit each member based on split type
        if (exp.splitType === 'custom' && exp.customSplits) {
            // Custom split: debit each member their specific share
            members.forEach(member => {
                const memberShare = parseFloat(exp.customSplits[member]) || 0;
                if (balances.hasOwnProperty(member)) {
                    balances[member] -= memberShare;
                }
            });
        } else {
            // Equal split: divide amount equally
            const splitAmount = exp.amount / members.length;
            members.forEach(member => {
                if (balances.hasOwnProperty(member)) {
                    balances[member] -= splitAmount;
                }
            });
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

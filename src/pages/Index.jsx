import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerDemo } from '@/components/ui/date-picker';
import { toast } from 'sonner';

const placeholderTransactions = [
  { id: 1, date: '2023-10-01', amount: 150, type: 'Expense', brand: 'Nike' },
  { id: 2, date: '2023-10-05', amount: 200, type: 'Income', brand: 'Adidas' },
  { id: 3, date: '2023-10-10', amount: 100, type: 'Expense', brand: 'Puma' },
];

const Index = () => {
  const [transactions, setTransactions] = useState(placeholderTransactions);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleSaveTransaction = (transaction) => {
    if (isEditMode) {
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t));
      toast('Transaction updated successfully');
    } else {
      setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }]);
      toast('Transaction added successfully');
    }
    setIsEditMode(false);
    setCurrentTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setIsEditMode(true);
    setCurrentTransaction(transaction);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast('Transaction deleted successfully');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Sneaker Accounting Dashboard</h1>
      <p className="mb-4">Track your sneaker transactions easily.</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" className="mb-4">Add Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
          </DialogHeader>
          <TransactionForm
            transaction={currentTransaction}
            onSave={handleSaveTransaction}
            onCancel={() => {
              setIsEditMode(false);
              setCurrentTransaction(null);
            }}
          />
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.brand}</TableCell>
              <TableCell>
                <Button variant="secondary" size="sm" onClick={() => handleEditTransaction(transaction)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const TransactionForm = ({ transaction, onSave, onCancel }) => {
  const [date, setDate] = useState(transaction?.date || '');
  const [amount, setAmount] = useState(transaction?.amount || '');
  const [type, setType] = useState(transaction?.type || 'Expense');
  const [brand, setBrand] = useState(transaction?.brand || 'Nike');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: transaction?.id, date, amount, type, brand });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <DatePickerDemo selected={date} onSelect={setDate} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Brand</label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Adidas">Adidas</SelectItem>
            <SelectItem value="Puma">Puma</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Save</Button>
      </div>
    </form>
  );
};

export default Index;
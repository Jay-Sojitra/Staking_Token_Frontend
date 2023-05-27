import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Home = ({ contract, account }) => {
    const [tokenName, setTokenName] = useState('');
    const [stakingAmount, setStakingAmount] = useState('');
    const [mintingAmount, setMintingAmount] = useState('');
    const [stakeBalance, setStakeBalance] = useState(0);
    const [userBalance, setUserBalance] = useState(0);


    useEffect(() => {
        const fetchTokenName = async () => {
            if (contract) {
                try {
                    const name = await contract._name();
                    setTokenName(name);
                } catch (error) {
                    window.alert(error.data.message);
                    console.error('Error staking tokens:', error);
                }
            }
        };
        if (contract) {
            getStakeBalance();
            getUserBalance();
        }

        fetchTokenName();
    }, [contract]);



    const handleStake = async () => {
        if (!contract || !stakingAmount) return;

        try {

            const amount = ethers.utils.parseEther(stakingAmount.toString());

            await (await contract.stake(amount)).wait();
            await getStakeBalance();
            await getUserBalance();
            setStakingAmount('');
        } catch (error) {
            window.alert(error.data.message);
            console.error('Error staking tokens:', error);

        }
    };

    const handleUnstake = async () => {
        if (!contract) return;

        try {

            await (await contract.unstake()).wait();
            await getStakeBalance();
            await getUserBalance();

        } catch (error) {
            window.alert(error.data.message);
            console.error('Error staking tokens:', error);

        }
    };

    const handleMint = async () => {
        if (!contract || !mintingAmount) return;

        try {
            const amount = ethers.utils.parseEther(mintingAmount.toString());
            await (await contract.mint(amount)).wait();
            await getUserBalance();
            setMintingAmount('');
        } catch (error) {
            window.alert(error.data.message);
            console.error('Error staking tokens:', error);

        }
    };

    const getStakeBalance = async () => {
        try {
            const { amount, timestamp } = await contract._stakes(account);
            console.log('balance', amount);
            console.log('timestamp', timestamp);
            const formattedBalance = ethers.utils.formatEther(amount.toString());
            console.log(formattedBalance);
            setStakeBalance(formattedBalance);
        } catch (error) {
            console.error('Error retrieving stake balance:', error);
        }
    };

    const getUserBalance = async () => {
        try {
            const balance = await contract.balanceOf(account);
            console.log('balance', balance);
            const formattedBalance = ethers.utils.formatEther(balance.toString());
            console.log('formattedBalance', formattedBalance);
            setUserBalance(formattedBalance);
        } catch (error) {
            console.error('Error retrieving user balance:', error);
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: ' azure' }}>


            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '15px', border: '0px solid black', padding: '84px', backgroundColor: 'aliceblue', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}>
                <h2 style={{ color: 'darkred' }}>{tokenName}</h2>
                
                <h3>Stake Balance : {stakeBalance ? stakeBalance : "Loading..."} Token</h3>
                <h3>Your Balance : {userBalance ? userBalance : 'Loading...'} Token </h3>
                <hr />
                <div className='mt-3 mb-3'>
                    <h3>Mint Tokens</h3>
                    <input
                        style={{ height: '2.3rem', width: '13rem', borderRadius: '11px' }}
                        type="number"
                        placeholder="Amount"
                        value={mintingAmount}
                        onChange={(e) => setMintingAmount(e.target.value)}

                    />
                    <button
                        style={{ width: '4rem', marginBottom: '6px' }}
                        type="button"
                        class="btn btn-primary ms-2"
                        onClick={handleMint}
                        disabled={!account || !mintingAmount}>
                        Mint
                    </button>

                </div>
                <div>
                    <h3>Stake Tokens</h3>
                    <input
                        style={{ height: '2.3rem', width: '13rem', borderRadius: '11px' }}
                        type="number"
                        placeholder="Amount"
                        value={stakingAmount}
                        onChange={(e) => setStakingAmount(e.target.value)}
                    />
                    <button
                        style={{ width: '4rem', marginBottom: '6px' }}
                        type="button"
                        class="btn btn-primary ms-2"
                        onClick={handleStake} disabled={!account || !stakingAmount}>
                        Stake
                    </button>
                </div>
                <div className='mt-3' style={{ marginLeft: '-5rem' }}>
                    <h3>Unstake Tokens</h3>
                    <button
                        style={{ width: '6rem', }}
                        type="button"
                        class="btn btn-success"
                        onClick={handleUnstake} disabled={!account}>
                        Unstake
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

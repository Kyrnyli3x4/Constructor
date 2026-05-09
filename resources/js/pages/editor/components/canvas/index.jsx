import { useState, useEffect } from 'react'
import Block from '@/pages/editor/components/block/index.jsx'
import BotSelector from '@/pages/editor/components/BotSelector.jsx'
import Sheets from '@/pages/editor/components/sheet/index.jsx'

const initializeBlocks = (botId) => {
    if (!botId) return [{ id: 1, isFirst: true }]
    const storageKey = `bot_${botId}_blocks`
    const savedBlocks = localStorage.getItem(storageKey)
    
    if (savedBlocks) {
        try {
            return JSON.parse(savedBlocks)
        } catch (e) {
            console.error('Error loading blocks:', e)
            return [{ id: 1, isFirst: true }]
        }
    }
    return [{ id: 1, isFirst: true }]
}

const initializeBlockData = (botId) => {
    if (!botId) return {}
    const storageKey = `bot_${botId}_blocks`
    const savedData = localStorage.getItem(`${storageKey}_data`)
    
    if (savedData) {
        try {
            return JSON.parse(savedData)
        } catch (e) {
            console.error('Error loading block data:', e)
            return {}
        }
    }
    return {}
}

export default function Canvas({ botId, bots, onSelectBot }) {
    const [blocks, setBlocks] = useState(() => initializeBlocks(botId))
    const [blockData, setBlockData] = useState(() => initializeBlockData(botId))
    const [openSheets, setOpenSheets] = useState(null)

    // Загружаем новые блоки когда меняется botId
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBlocks(initializeBlocks(botId))
        setBlockData(initializeBlockData(botId))
    }, [botId])

    // Сохраняем блоки в localStorage
    useEffect(() => {
        if (!botId) return
        const storageKey = `bot_${botId}_blocks`
        localStorage.setItem(storageKey, JSON.stringify(blocks))
        localStorage.setItem(`${storageKey}_data`, JSON.stringify(blockData))
    }, [blocks, blockData, botId])

    const addBlock = () => {
        const newId = blocks.length + 1
        setBlocks([...blocks, { id: newId, isFirst: false }])
    }

    const openSheetsForBlock = (blockId) => {
        setOpenSheets(blockId)
    }

    const closeSheets = () => {
        setOpenSheets(null)
    }

    const validateBlock = (blockId, data) => {
        const block = blocks.find(b => b.id === blockId)
        if (block.isFirst && (!data.command || data.command.trim() === '')) {
            // Валидация проходит, но ошибки не отображаются (мягкая система)
        } else {
            // Валидация успешна
        }
        setBlockData(prev => ({ ...prev, [blockId]: data }))
    }

    const getBlockData = (blockId) => blockData[blockId] || {}

    return (
        <div className="flex-1 overflow-hidden p-6 bg-muted/30 rounded-xl">
             
            <div className="h-full rounded-xl border shadow-inner p-6 flex flex-col gap-4">
                <BotSelector
                    bots={bots}
                    selectedBotId={botId}
                    onSelectBot={onSelectBot}
                />
                {botId && blocks.map(block => (
                    <Block
                        key={block.id}
                        id={block.id}
                        open={() => openSheetsForBlock(block.id)}
                        message={getBlockData(block.id)?.message}
                    >
                        {/* Здесь можно добавить содержимое блока */}
                    </Block>
                ))}
                {botId && (
                    <button
                        onClick={addBlock}
                        className="w-[220px] h-[120px] border border-dashed border-border rounded-xl p-4 text-muted-foreground text-sm italic justify-center items-center flex hover:border-primary/40"
                    >
                        Добавить блок
                    </button>
                )}
                <Sheets
                    key={openSheets}
                    open={openSheets !== null}
                    onClose={closeSheets}
                    blockId={openSheets}
                    isFirst={openSheets ? blocks.find(b => b.id === openSheets)?.isFirst : false}
                    onValidate={validateBlock}
                    initialMessage={getBlockData(openSheets)?.message || ''}
                    initialCommand={getBlockData(openSheets)?.command || '/start'}
                />
            </div>
        </div>
    )
}

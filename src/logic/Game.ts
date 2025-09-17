import { CardData as Card } from './CardData'

export default class Game {
    private board: Card[] = []
    private deck: Card[] = []
    private foundSets: Card[][] = []

    constructor() {
        this.generateDeck()
    }

    public generateDeck(): void {
        this.deck = []
        this.foundSets = []

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        this.deck.push(new Card(i, j, k, l))
                    }
                }
            }
        }
    }

    public getBoard(): Card[] {
        return this.board
    }

    public getDeck(): Card[] {
        return this.deck
    }

    public getFoundSets(): Card[][] {
        return this.foundSets
    }

    private drawCard(placeInIndex?: number): void {
        if (this.deck.length === 0) {
            console.error('Deck is empty! Cannot draw more cards.')
            return
        }

        const randomIndex: number = Math.floor(Math.random() * this.deck.length)
        const card = this.deck[randomIndex]

        if (card) {
            if (placeInIndex) {
                this.board.splice(placeInIndex, 0, card)
            } else {
                this.board.push(card)
            }

            this.deck.splice(randomIndex, 1)
        } else {
            console.error('Attempted to draw an undefined card from deck!')
        }
    }

    public drawThreeMoreCards(): void {
        this.drawCard(3)
        this.drawCard(7)
        this.drawCard(11)
    }

    public async drawBoard(): Promise<void> {
        this.board = []

        for (let i = 0; i < 12; i++) {
            this.drawCard()
        }
    }

    public clearBoard(): void {
        this.board = []
    }

    public replaceSetOnBoard(set: Card[]): void {
        set.forEach((card) => {
            // For each card in set
            const cardIndex: number = this.board.indexOf(card)

            if (this.deck.length > 0) {
                const randomIndex: number = Math.floor(Math.random() * this.deck.length)
                const newCard: Card = this.deck.splice(randomIndex, 1)[0] // Remove card from deck and get its value
                this.board[cardIndex] = newCard // Put new card in place of old one
            } else {
                this.board.splice(cardIndex, 1) // If deck is empty, just remove card from board
            }
        })
    }

    public removeSetOnBoard(set: Card[]): void {
        set.forEach((card) => {
            const cardIndex: number = this.board.indexOf(card)
            this.board.splice(cardIndex, 1)
        })
    }

    public isSet(cards: Card[]): boolean {
        if (cards.length !== 3) {
            return false
        }
        const color: number = cards[0].getColor() + cards[1].getColor() + cards[2].getColor()
        const shape: number = cards[0].getShape() + cards[1].getShape() + cards[2].getShape()
        const shading: number = cards[0].getShading() + cards[1].getShading() + cards[2].getShading()
        const number: number = cards[0].getNumber() + cards[1].getNumber() + cards[2].getNumber()

        return color % 3 === 0 && shape % 3 === 0 && shading % 3 === 0 && number % 3 === 0
    }

    public findSets(): boolean {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = i + 1; j < this.board.length; j++) {
                for (let k = j + 1; k < this.board.length; k++) {
                    if (this.isSet([this.board[i], this.board[j], this.board[k]])) {
                        console.log(
                            'Indexes of set:',
                            this.board.indexOf(this.board[i]) + 1,
                            this.board.indexOf(this.board[j]) + 1,
                            this.board.indexOf(this.board[k]) + 1
                        )
                        return true
                    }
                }
            }
        }
        // console.log('No sets found.')
        return false
    }

    private sortSet(set: Card[]): Card[] {
        return [...set].sort((a, b) => {
            const numberDifference = a.getNumber() - b.getNumber()
            if (numberDifference !== 0) return numberDifference

            const colorDifference = a.getColor() - b.getColor()
            if (colorDifference !== 0) return colorDifference

            const shapeDifference = a.getShape() - b.getShape()
            if (shapeDifference !== 0) return shapeDifference

            return a.getShading() - b.getShading()
        })
    }

    public addSetToFoundSets(set: Card[]): void {
        this.foundSets.push(this.sortSet(set))
    }
}

import { PseudoStateKind, NamedElement, Vertex, State, PseudoState, Visitor } from '.';
import { Transaction } from './Transaction';

/**
 * A region is a container of vertices (states and pseudo states) within a state machine model.
 */
export class Region extends NamedElement {
	/**
	 * The child  vertices of this region.
	 * @internal
	 * @hidden
	 */
	children: Array<Vertex> = [];

	/**
	 * The initial pseudo state, defining the starting vertex when region is entered.
	 * @internal
	 * @hidden
	 */
	initial: PseudoState | undefined;

	/**
	 * Creates a new instance of the Region class.
	 * @param name The name of the region.
	 * @param parent The parent state of this region.
	 */
	public constructor(name: string, public readonly parent: State) {
		super(name, parent);

		parent.children.push(this);
	}

	/**
	 * Returns the parent element of this region.
	 * @returns Returns the parent element of this element.
	 * @internal
	 * @hidden
	 */
	getParent(): NamedElement | undefined {
		return this.parent;
	}

	/** 
	 * Tests a state machine instance to see if this region is complete within it.
	 * A region is complete if it's current state is a final state (one with no outgoing transitions).
	 * @internal
	 * @hidden 
	 */
	isComplete(transaction: Transaction): boolean {
		const currentState = transaction.getState(this);

		return currentState && currentState.isFinal();
	}

	/**
	 * Performs the final steps required to enter the region dueing state transition; enters the region using the initial pseudo state or history logic.
	 * @param transaction The current transaction being executed.
	 * @param history Flag used to denote deep history semantics are in force at the time of entry.
	 * @param trigger The event that triggered the state transition.
	 * @internal
	 * @hidden
	 */
	doEnterTail(transaction: Transaction, history: boolean, trigger: any): void {
		const current = transaction.getState(this);
		const starting = (history || (this.initial && this.initial.isHistory)) && current ? current : this.initial;
		const deepHistory = history || (this.initial !== undefined && this.initial.kind === PseudoStateKind.DeepHistory);

		starting!.doEnter(transaction, deepHistory, trigger);
	}

	/**
	 * Exits a region during a state transition.
	 * @param transaction The current transaction being executed.
	 * @param history Flag used to denote deep history semantics are in force at the time of exit.
	 * @param trigger The event that triggered the state transition.
	 * @internal
	 * @hidden
	 */
	doExit(transaction: Transaction, history: boolean, trigger: any): void {
		transaction.getVertex(this).doExit(transaction, history, trigger);

		super.doExit(transaction, history, trigger);
	}

	/**
	 * Accepts a visitor and calls back its visitRegion method and cascade to child vertices.
	 * @param visitor The visitor to call back.
	 */
	public accept(visitor: Visitor): void {
		visitor.visitRegion(this);

		for (const vertex of this.children) {
			vertex.accept(visitor);
		}

		visitor.visitRegionTail(this);
	}
}

import { PseudoStateKind } from './PseudoStateKind';
import { Region } from './Region';
import { State } from './State';
import { Transition } from './Transition';
import { ExternalTransition } from './ExternalTransition';
/**
 * A pseudo state is a transient elemement within a state machine, once entered it will evaluate outgoing transitions and attempt to exit.
 * @public
 */
export declare class PseudoState {
    readonly name: string;
    readonly kind: PseudoStateKind;
    readonly parent: Region;
    /**
     * The fully qualified name of the vertex including its parent's qualified name.
     * @public
     */
    readonly qualifiedName: string;
    readonly isHistory: boolean;
    /**
     * The outgoing transitions available from this vertex.
     */
    outgoing: Array<Transition>;
    /**
     * Creates a new instance of the PseudoState class.
     * @param name The name of the pseudo state.
     * @param parent The parent region of the pseudo state; a state may also be specified in which case the state's default region will be used as the parent region.
     * @param kind The kind of pseudo state; this defines its behaviour and use. See PseudoStateKind for more information.
     * @public
     */
    constructor(name: string, parent: State | Region, kind?: PseudoStateKind);
    /**
     * Creates a new external transition.
     * @param target The target vertex of the external transition.
     * @returns The external transition.
     * @public
     */
    external<TTrigger>(target: State | PseudoState): ExternalTransition<TTrigger>;
    /**
     * Creates a new external transition.
     * @param target The target vertex of the external transition.
     * @returns The external transition.
     * @public
     * @deprecated
     */
    to<TTrigger>(target: State | PseudoState): ExternalTransition<TTrigger>;
    /**
     * Creates a new else transition for branch (junction and choice) pseudo states; else transitions are selected if no other transitions guard conditions evaluate true.
     * @param target The target of the transition.
     * @returns Returns the new else transition.
     * @public
     */
    else<TTrigger>(target: State | PseudoState): ExternalTransition<TTrigger>;
    /**
     * Returns the fully qualified name of the pseudo state.
     * @public
     */
    toString(): string;
}

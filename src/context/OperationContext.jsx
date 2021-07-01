import * as React from 'react';
import { BlockTypes } from '../constants/BlockTypes';
import { BlockSizes, ComponentTypes, OperationTypes } from '../constants';
import { useActions, useSelectors } from '../hooks';
import produce from 'immer';
import { BlocksLogicSwitchFactory } from '../logic/SwitchFactory';

const OperationContext = React.createContext();

// TODO move to another place
const blocksLogicSwitchFactory = new BlocksLogicSwitchFactory();

blocksLogicSwitchFactory
  .addCase(
    {
      source: [ComponentTypes.GENERATOR, BlockTypes.UNIT],
      target: [ComponentTypes.CONTAINER, BlockTypes.UNIT]
    },
    ({ source, state }) => {
      state.blocksCount.units += source.blockSize;
      return state;
    }
  )
  .addCase(
    {
      source: [ComponentTypes.GENERATOR, BlockTypes.TEN],
      target: [ComponentTypes.CONTAINER, BlockTypes.TEN]
    },
    ({ state }) => {
      state.blocksCount.tens++;
      return state;
    }
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.TEN],
      target: [ComponentTypes.GENERATOR, BlockTypes.TEN]
    },
    ({ state }) => {
      state.blocksCount.tens--;
      return state;
    }
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.TEN],
      target: [ComponentTypes.CONTAINER, BlockTypes.UNIT]
    },
    ({ state }) => {
      state.blocksCount.tens--;
      state.blocksCount.units += 10;
      return state;
    }
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.UNIT],
      target: [ComponentTypes.GENERATOR, BlockTypes.UNIT]
    },
    ({ source, state }) => {
      if (source.blockSize !== BlockSizes.TEN) {
        state.blocksCount.units--;
      }
      return state;
    }
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.UNIT],
      target: [ComponentTypes.CONTAINER, BlockTypes.TEN]
    },
    ({ source, state }) => {
      if (source.blockSize !== BlockSizes.TEN) {
        return state;
      }

      state.blocksCount.units -= 10;
      state.blocksCount.tens++;
      return state;
    }
  )
  .addCase(
    {
      source: [ComponentTypes.CONTAINER, BlockTypes.UNIT],
      target: [ComponentTypes.GENERATOR, BlockTypes.TEN]
    },
    ({ source, state }) => {
      if (source.blockSize !== BlockSizes.TEN) {
        return state;
      }

      state.blocksCount.units -= 10;
      return state;
    }
  )
  .addDefaultCase(({ state }) => state);

/** */
const operationReducer = produce((state, action) => {
  const { source, target, blocksCount, operandTarget, operandTargetVerified } = action.payload;

  /* */
  switch (action.type) {
    case OperationTypes.DROP_ENDS: {
      return blocksLogicSwitchFactory.process(
        {
          source: [source.componentType, source.blockType],
          target: [target.componentType, target.blockType]
        },
        {
          state,
          source
        }
      );
    }

    case OperationTypes.DRAG_STARTS: {
      state.isDragging = source;
      break;
    }

    case OperationTypes.DRAG_ENDS: {
      state.isDragging = false;
      break;
    }

    case OperationTypes.SET_BLOCKS_COUNT: {
      state.blocksCount = { ...state.blocksCount, ...blocksCount };
      break;
    }
    case OperationTypes.SET_OPERAND_TARGET: {
      state.operandTarget = operandTarget;
      break;
    }
    case OperationTypes.SET_OPERAND_TARGET_VERIFIED: {
      state.isOperandTargetVerified = operandTargetVerified;
      break;
    }
    case OperationTypes.RESET: {
      return initialState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
});

/** */
const initialState = {
  operandTarget: 0,
  blocksCount: { tens: 0, units: 0 },
  isDragging: false,
  isOperandTargetVerified: false
};

/** */
function OperationProvider({ children }) {
  const [state, dispatch] = React.useReducer(operationReducer, initialState);

  const value = [state, dispatch];

  return <OperationContext.Provider value={value}>{children}</OperationContext.Provider>;
}

/** */
function useOperationContext() {
  const context = React.useContext(OperationContext);

  if (context === undefined) {
    throw new Error('useOperation must be used within a CountProvider');
  }

  //
  const [state] = context;

  // Map a memoized object with action creators object to avoid recreate it in each component render.
  const actions = useActions(context, (dispatch) => ({
    dragStarts: ({ item }) =>
      dispatch({ type: OperationTypes.DRAG_STARTS, payload: { source: item } }),
    dragEnds: ({ item }) => dispatch({ type: OperationTypes.DRAG_ENDS, payload: { source: item } }),
    dropEnds: ({ blockType, componentType, item }) =>
      dispatch({
        type: OperationTypes.DROP_ENDS,
        payload: { target: { blockType, componentType }, source: item }
      }),

    setOperandTarget: ({ operandTarget }) =>
      dispatch({ type: OperationTypes.SET_OPERAND_TARGET, payload: { operandTarget } }),
    setOperandTargetVerified: ({ operandTargetVerified }) =>
      dispatch({
        type: OperationTypes.SET_OPERAND_TARGET_VERIFIED,
        payload: { operandTargetVerified }
      }),
    setBlocksCount: ({ blocksCount }) =>
      dispatch({ type: OperationTypes.SET_BLOCKS_COUNT, payload: { blocksCount } }),

    reset: () => dispatch({ type: OperationTypes.RESET, payload: {} })
  }));

  // Map a memoized object with selector functions to avoid recreate it in each component render.
  const selectors = useSelectors(
    context,
    ({ blocksCount, operandTarget, isOperandTargetVerified }) => ({
      getBlocksCountNumber: () => blocksCount.tens * 10 + blocksCount.units,
      isOperandTargetReached: () => blocksCount.tens * 10 + blocksCount.units === operandTarget,
      getOperandTargetStatus: () =>
        !isOperandTargetVerified
          ? false
          : blocksCount.tens * 10 + blocksCount.units !== operandTarget
          ? 'error'
          : 'success'
    })
  );

  return { ...state, ...selectors, ...actions };
}

export { OperationProvider, useOperationContext };

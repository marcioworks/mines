import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import MineField from './src/components/MineField';
import { cloneBoard, createMinedBoard, hadExplosion, openField, showMines, wonGame } from './src/gameLogic';
import params from './src/params';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(rows * cols * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won:false,
      lost:false
    };
  };

  onOpenField = (row,column) =>{
    const board = cloneBoard(this.state.board)
    openField(board,row,column)
    const lost = hadExplosion(board)
    const won= wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Perdeu!, Tente de novo!')
    }
    if(won){
      Alert.alert('Parabéns, Você Venceu o jogo!')
    }

    this.setState({board,lost,won})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando Mines!!</Text>
        <Text style={styles.instructions}>
          Tamanho da Grade:
          {params.getRowsAmount()} X {params.getColumsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems:'center',
    backgroundColor:'#AAA'
  },
  welcome: {
    fontSize: 32,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  instructions: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

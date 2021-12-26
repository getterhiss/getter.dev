/**
 * Quotable API
 * https://api.quotable.io
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Quote = {
  _id: string;
  tags: string[];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}
 
const Quotable = () => {

  const [quote, setQuote] = useState<Quote>();
  const { author, content } = quote || {};

  // Get Quote from Quotable API
  const getQuote = () => {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((res) => setQuote(res))
      .catch((err) => console.warn('Error Quote API: ', err?.message));
  }
 
  useEffect(() => {
    getQuote();
  }, []);
 
  return (
    <TouchableOpacity onPress={() => getQuote()}>
      {!!content && (
        <Text style={styles.text}>
          "{content}" {!!author && ` - ${author}`}
        </Text>
      )}
    </TouchableOpacity>
  )
};
 
export default Quotable;  

const styles = StyleSheet.create({
  text: {
    fontFamily: 'corben',
    fontSize: 24,
    lineHeight: 28,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 40
  },
});
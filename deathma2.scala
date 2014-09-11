object Main {
  def main(args:Array[String]) = {
    println(
      List.range(65, 91).map(t => "%c%cx82%cx83%cx83%cx82%c%c%c" format(t+32,t,t+95,t,t,t+95,t,t+32)).mkString("")
    )
    }
}
